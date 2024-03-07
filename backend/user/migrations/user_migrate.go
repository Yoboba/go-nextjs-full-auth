package main

import (
	"log"

	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
	"github.com/Yoboba/GNA/user/entities"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	userMigrate(db)
}

func userMigrate(db database.Database) {
	err := db.GetDB().Migrator().CreateTable(&entities.User{})
	if err != nil {
		log.Fatal(err)
	}
}
