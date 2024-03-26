package migrations

import (
	"log"

	"github.com/Yoboba/GNA/database"
	"github.com/Yoboba/GNA/pkg/entities"
)

type postgresMigration struct {
	db database.Database
}

func NewPostgresMigration(db database.Database) Migration {
	return &postgresMigration{db: db}
}

// TableMigrate implements Migration.
func (p postgresMigration) TableMigrate() error {
	roleMigrate(p.db)
	tagMigrate(p.db)
	userMigrate(p.db)
	blogMigrate(p.db)
	return nil
}

// MockDataMigrate implements Migration.
func (p postgresMigration) MockDataMigrate() error {
	createRoleMockData(p.db)
	createUserMockData(p.db)
	createBlogMockData(p.db)
	return nil
}

func blogMigrate(db database.Database) {
	err := db.GetDB().AutoMigrate(&entities.Blog{})
	if err != nil {
		log.Fatalf("\ncannot migrate blog : %v", err)
	}
}
func roleMigrate(db database.Database) {
	err := db.GetDB().AutoMigrate(entities.Role{})
	if err != nil {
		log.Fatalf("\ncannot migrate role : %v", err)
	}
}
func tagMigrate(db database.Database) {
	err2 := db.GetDB().Migrator().CreateTable(&entities.Tag{})
	if err2 != nil {
		log.Fatalf("\ncannot migrate tag : %v", err2)
	}
}
func userMigrate(db database.Database) {
	err := db.GetDB().AutoMigrate(&entities.User{})
	if err != nil {
		log.Fatalf("\ncannot migrate user : %v", err)
	}
}

func createBlogMockData(db database.Database) {
	blogs := []entities.Blog{
		{Title: "Go Clean Architecture", Caption: "maintainable and sustainability", Body: "Go Clean Architecture body test", UserID: 1, Tags: []entities.Tag{
			{Name: "GO (Programming Language)"},
			{Name: "Clean Architecture"},
		}},
	}

	result := db.GetDB().Create(blogs)
	if result.Error != nil {
		log.Fatalf("\ncannot create blog mock data : %v", result.Error)
	}
}

func createRoleMockData(db database.Database) {
	roles := []entities.Role{
		{Name: "user"},
		{Name: "moderator"},
	}
	result := db.GetDB().Create(roles)
	if result.Error != nil {
		log.Fatalf("\ncannot create roles : %v", result.Error)
	}
}

func createUserMockData(db database.Database) {
	users := []entities.User{
		{Username: "Yobubble", Email: "thanachot.onl@student.mahidol.ac.th", Password: "123sd2", RoleID: 1},
		{Username: "Prisma", Email: "Nanthapat.wat@student.mahidol.ac.th", Password: "aw12345dd", RoleID: 2},
	}

	result := db.GetDB().Create(users)
	if result.Error != nil {
		log.Fatalf("\ncannot create users mock data : %v", result.Error)
	}
}
