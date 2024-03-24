package main

import (
	"log"

	blogEntity "github.com/Yoboba/GNA/app/blog/entities"
	tagEntity "github.com/Yoboba/GNA/app/tag/entities"
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
	err := db.GetDB().AutoMigrate(&blogEntity.Blog{})
	if err != nil {
		log.Fatalf("\ncannot migrate blog : %v", err)
	}
}

func createBlogMockData(db database.Database) {
	blogs := []blogEntity.Blog{
		{Title: "Go Clean Architecture", Caption: "maintainable and sustainability", Body: "Go Clean Architecture body test", UserID: 1, Tags: []tagEntity.Tag{
			{Name: "GO (Programming Language)"},
			{Name: "Clean Architecture"},
		}},
	}

	result := db.GetDB().Create(blogs)
	if result.Error != nil {
		log.Fatalf("\ncannot create blog mock data : %v", result.Error)
	}
}
