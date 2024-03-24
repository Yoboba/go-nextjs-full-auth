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
	err := db.GetDB().AutoMigrate(entities.Role{})
	if err != nil {
		log.Fatalf("\ncannot migrate role : %v", err)
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
