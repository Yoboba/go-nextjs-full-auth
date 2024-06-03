package migrations

import (
	"fmt"

	"github.com/Yoboba/GNA/database"
	"github.com/Yoboba/GNA/pkg/entities"
	"gorm.io/gorm"
)

type postgresMigration struct {
	db database.Database
}

// Reset implements Migration.
func (p *postgresMigration) Reset() error {
	// Remove all the tables & constraints
	p.db.GetDB().Migrator().DropTable(&entities.Blog{})
	p.db.GetDB().Migrator().DropTable(&entities.User{})
	p.db.GetDB().Migrator().DropTable(&entities.Tag{})
	p.db.GetDB().Migrator().DropTable(&entities.Role{})
	p.db.GetDB().Migrator().DropTable("blog_tags")
	p.db.GetDB().Migrator().DropTable("user_blogs_like")
	// Add empty tables
	p.db.GetDB().AutoMigrate(&entities.Role{})
	p.db.GetDB().AutoMigrate(&entities.Tag{})
	p.db.GetDB().AutoMigrate(&entities.User{})
	p.db.GetDB().AutoMigrate(&entities.Blog{})
	return nil
}

func NewPostgresMigration(db database.Database) Migration {
	return &postgresMigration{db: db}
}

// MockDataMigrate implements Migration.
func (p postgresMigration) MockDataMigrate() error {
	// initial data
	p.db.GetDB().Create(&roles)
	p.db.GetDB().Create(&users)

	// Test data
	for _, blog := range blogs {
		var tags []entities.Tag
		for _, tag := range blog.Tags {
			var existingTag entities.Tag
			result := p.db.GetDB().Where("name = ?", tag.Name).First(&existingTag)
			if result.Error != nil {
				fmt.Println(result.Error)
			}
			if result.RowsAffected == 0 {
				fmt.Println("add")
				tags = append(tags, tag)
			} else {
				fmt.Printf("%s already existed", tag.Name)
				tags = append(tags, existingTag)
			}
		}
		blog.Tags = tags
		p.db.GetDB().Create(&blog)
	}

	// create user like blog
	CreateUserBlogsLike(1, 1, *p.db.GetDB())
	CreateUserBlogsLike(1, 2, *p.db.GetDB())
	CreateUserBlogsLike(2, 1, *p.db.GetDB())
	CreateUserBlogsLike(3, 1, *p.db.GetDB())
	CreateUserBlogsLike(4, 1, *p.db.GetDB())
	CreateUserBlogsLike(4, 3, *p.db.GetDB())

	return nil
}

func CreateUserBlogsLike(userId uint, blogId uint, db gorm.DB) error {
	var blog entities.Blog
	var user entities.User
	blogResult := db.Where("id = ?", blogId).First(&blog)
	if blogResult.Error != nil {
		return blogResult.Error
	}
	userResult := db.Where("id = ?", userId).First(&user)
	if userResult.Error != nil {
		return userResult.Error
	}
	err := db.Model(&user).Association("Blogs").Append(&blog)
	if err != nil {
		return err
	}
	return nil
}
