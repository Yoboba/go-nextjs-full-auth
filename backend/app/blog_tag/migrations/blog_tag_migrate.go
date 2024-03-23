package main

import (
	"log"

	"github.com/Yoboba/GNA/app/blog_tag/entities"
	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	blogTagMigrate(db)
	createBlogTagMockData(db)
}

func blogTagMigrate(db database.Database) {
	err := db.GetDB().Migrator().CreateTable(&entities.Blog_Tag{})
	if err != nil {
		log.Fatalf("Cannot Migrate Blog Tag : %v", err)
	}
}

func createBlogTagMockData(db database.Database) {
	blogTags := []entities.Blog_Tag{
		{BlogID: 1, TagID: 3},
		{BlogID: 1, TagID: 4},
	}

	result := db.GetDB().Create(blogTags)
	if result.Error != nil {
		log.Fatalf("Cannot Create Blog tags Mock Data : %v", result.Error)
	}
}
