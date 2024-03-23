package main

import (
	"log"

	"github.com/Yoboba/GNA/app/role/entities"
	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	roleMigrate(db)
	createRoleMockData(db)
}

func roleMigrate(db database.Database) {
	err := db.GetDB().Migrator().CreateTable(&entities.Role{})
	if err != nil {
		log.Fatalf("Cannot migrate Role : %v", err)
	}
}

func createRoleMockData(db database.Database) {
	roles := []entities.Role{
		{Name: "guest"},
		{Name: "user"},
		{Name: "moderator"},
	}
	result := db.GetDB().Create(roles)
	if result.Error != nil {
		log.Fatalf("Cannot create roles : %v", result.Error)
	}
}
