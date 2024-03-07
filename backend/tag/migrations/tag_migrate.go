package main

import (
	"log"

	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
	"github.com/Yoboba/GNA/tag/entities"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	tagMigrate(db)
}

func tagMigrate(db database.Database) {
	err := db.GetDB().Migrator().CreateTable(&entities.Tag{})
	if err != nil {
		log.Fatal(err)
	}
}
