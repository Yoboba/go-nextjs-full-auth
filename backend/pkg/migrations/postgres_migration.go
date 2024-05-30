package migrations

import (
	"github.com/Yoboba/GNA/database"
)

type postgresMigration struct {
	db database.Database
}

// FetchingTest implements Migration.
func (p *postgresMigration) FetchingTest() error {
	panic("unimplemented")
}

func NewPostgresMigration(db database.Database) Migration {
	return &postgresMigration{db: db}
}

// TableMigrate implements Migration.
func (p postgresMigration) TableMigrate() error {
	// table create ordering
	// p.db.GetDB().AutoMigrate(&entities.Role{})
	// p.db.GetDB().AutoMigrate(&entities.Tag{})
	// p.db.GetDB().AutoMigrate(&entities.User{})
	// p.db.GetDB().AutoMigrate(&entities.Blog{})
	return nil
}

// MockDataMigrate implements Migration.
func (p postgresMigration) MockDataMigrate() error {
	// initial data
	// roles := []entities.Role{
	// 	{
	// 		Name: "user",
	// 	},
	// 	{
	// 		Name: "moderator",
	// 	},
	// }
	// p.db.GetDB().Create(roles)

	// Test data
	// users := []entities.User{
	// 	{Username: "Yobubble", Email: "Thanachot.onl@student.mahidol.ac.th", Password: "yobuza007", RoleID: 1},
	// 	{Username: "Prisma", Email: "Nanthapat.wat@student.mahidol.ac.th", Password: "guideza007", RoleID: 2},
	// }
	// p.db.GetDB().Create(users)
	// blogs := &entities.Blog{
	// 	Title:   "Go Clean Architecture",
	// 	Caption: "maintainable and sustainability",
	// 	Body:    "Go Clean Architecture body test",
	// 	UserID:  1,
	// 	Tags: []entities.Tag{
	// 		{
	// 			Name: "GO",
	// 		},
	// 		{
	// 			Name: "Clean Architecture",
	// 		},
	// 	},
	// }
	// prevent duplicate tag
	// var tags []entities.Tag
	// for _, tag := range blogs.Tags {
	// 	var existingTag entities.Tag
	// 	result := p.db.GetDB().Where("name = ?", tag.Name).First(&existingTag)
	// 	if result.Error != nil {
	// 		fmt.Print("some thing weird")
	// 	}
	// 	if result.RowsAffected == 0 {
	// 		fmt.Println("add")
	// 		tags = append(tags, tag)
	// 	} else {
	// 		fmt.Printf("%s already existed", tag.Name)
	// 		tags = append(tags, existingTag)
	// 	}
	// }
	// blogs.Tags = tags
	// p.db.GetDB().Create(blogs)
	return nil
}
