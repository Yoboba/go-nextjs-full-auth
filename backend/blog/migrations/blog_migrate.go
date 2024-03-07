package main

import (
	"log"

	"github.com/Yoboba/GNA/blog/entities"
	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	blogMigrate(db)
	blogTagMigrate(db)
}

func blogMigrate(db database.Database) {
	err := db.GetDB().Migrator().CreateTable(&entities.Blog{})
	if err != nil {
		log.Fatal(err)
	}
}

func blogTagMigrate(db database.Database) {
	err := db.GetDB().Migrator().CreateTable(&entities.Blog_Tag{})
	if err != nil {
		log.Fatal(err)
	}
}
