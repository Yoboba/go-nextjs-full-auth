package migrations

import (
	"fmt"

	"github.com/Yoboba/GNA/database"
	"github.com/Yoboba/GNA/pkg/entities"
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
	p.db.GetDB().Model(&entities.Blog{}).Association("Tags").DB.Migrator().DropTable("blog_tags")
	p.db.GetDB().Model(&entities.Blog{}).Association("Users").DB.Migrator().DropTable("user_blogs_like")
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
	roles := []entities.Role{
		{
			Name: "user",
		},
		{
			Name: "moderator",
		},
	}
	p.db.GetDB().Create(roles)

	users := []entities.User{
		{Username: "Yobubble", Email: "Thanachot.onl@student.mahidol.ac.th", Password: "$2a$10$DdB6INzHJegaH6FP3cAoN.gyYWhsf5FteT2lcpNa0pmCr3QtP2LK.", RoleID: 1}, // password : yobuza007
		{Username: "Prisma", Email: "Nanthapat.wat@student.mahidol.ac.th", Password: "$2a$10$PnRt9tWH93bC/95k5510m.fFeARX8XqvDVsVeNOYzDbQ7F/brz3ii", RoleID: 2},   // password : guideza007
	}
	p.db.GetDB().Create(users)

	// Test data
	// first blog
	blog1 := &entities.Blog{
		Title:   "Building Scalable Microservices with Go",
		Caption: "Discover how the Go programming language is revolutionizing the development of scalable, efficient microservices.",
		Body:    "The Go programming language, often referred to as Golang, has become a popular choice for developing microservices. Its simplicity, performance, and strong support for concurrent programming make it an ideal fit for building scalable and efficient microservices architectures.",
		UserID:  1, // <- Yobubble
		Tags: []entities.Tag{
			{
				Name: "GO",
			},
			{
				Name: "Microservices",
			},
			{
				Name: "Scalable Architecture",
			},
			{
				Name: "Concurrent Programming",
			},
			{
				Name: "RESTful APIs",
			},
		},
	}
	var tags1 []entities.Tag
	for _, tag := range blog1.Tags {
		var existingTag entities.Tag
		result := p.db.GetDB().Where("name = ?", tag.Name).First(&existingTag)
		if result.Error != nil {
			fmt.Print("some thing weird")
		}
		if result.RowsAffected == 0 {
			fmt.Println("add")
			tags1 = append(tags1, tag)
		} else {
			fmt.Printf("%s already existed", tag.Name)
			tags1 = append(tags1, existingTag)
		}
	}
	blog1.Tags = tags1
	p.db.GetDB().Create(blog1)

	// second blog
	blog2 := &entities.Blog{
		Title:   "Implementing Clean Architecture in Go: Best Practices and Benefits",
		Caption: "Learn how to leverage the principles of clean architecture in Go to build maintainable, scalable, and testable applications.",
		Body:    "Clean architecture is a design philosophy that aims to create systems that are easy to maintain, test, and scale by organizing code into layers with distinct responsibilities. When implemented in Go, clean architecture can help developers build robust applications that stand the test of time and adapt to changing requirements.",
		UserID:  2, // <- Prisma
		Tags: []entities.Tag{
			{
				Name: "GO", // <- Duplicated data
			},
			{
				Name: "Clean Architecture",
			},
			{
				Name: "Software Design",
			},
			{
				Name: "Microservices", // <- Duplicated data
			},
		},
	}
	var tags2 []entities.Tag
	for _, tag := range blog2.Tags {
		var existingTag entities.Tag
		result := p.db.GetDB().Where("name = ?", tag.Name).First(&existingTag)
		if result.Error != nil {
			fmt.Print("some thing weird")
		}
		if result.RowsAffected == 0 {
			fmt.Println("add")
			tags2 = append(tags2, tag)
		} else {
			fmt.Printf("%s already existed", tag.Name)
			tags2 = append(tags2, existingTag)
		}
	}
	blog2.Tags = tags2
	p.db.GetDB().Create(blog2)

	// create user like blog
	var likedBlog1 entities.Blog
	var user1 entities.User
	p.db.GetDB().Where("id = ?", 1).First(&likedBlog1)
	p.db.GetDB().Where("id = ?", 1).First(&user1)
	p.db.GetDB().Model(&user1).Association("Blogs").Append(&likedBlog1)

	var likedBlog2 entities.Blog
	var user2 entities.User
	p.db.GetDB().Where("id = ?", 2).First(&likedBlog2)
	p.db.GetDB().Where("id = ?", 1).First(&user2)
	p.db.GetDB().Model(&user2).Association("Blogs").Append(&likedBlog2)

	var likedBlog3 entities.Blog
	var user3 entities.User
	p.db.GetDB().Where("id = ?", 1).First(&likedBlog3)
	p.db.GetDB().Where("id = ?", 2).First(&user3)
	p.db.GetDB().Model(&user3).Association("Blogs").Append(&likedBlog3)

	return nil
}
