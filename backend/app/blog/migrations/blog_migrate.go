package main

import (
	"log"

	"github.com/Yoboba/GNA/app/blog/entities"
	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	blogMigrate(db)
	createBlogMockData(db)
}

func blogMigrate(db database.Database) {
	err := db.GetDB().Migrator().CreateTable(&entities.Blog{})
	if err != nil {
		log.Fatalf("Cannot Migrate Blog : %v", err)
	}
}

func createBlogMockData(db database.Database) {
	blogs := []entities.Blog{
		{Title: "Go Clean Architecture", Caption: "maintainable and sustainability", Body: "Go Clean Architecture body test", UserID: 1},
	}

	result := db.GetDB().Create(blogs)
	if result.Error != nil {
		log.Fatalf("Cannot Create Blog Mock Data : %v", result.Error)
	}
}
