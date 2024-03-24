package main

import (
	"log"

	"github.com/Yoboba/GNA/app/tag/entities"
	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	tagMigrate(db)
	// createTagMockData(db)
}

func tagMigrate(db database.Database) {
	err2 := db.GetDB().Migrator().CreateTable(&entities.Tag{})
	if err2 != nil {
		log.Fatalf("\ncannot migrate tag : %v", err2)
	}
}

// func createTagMockData(db database.Database) {
// 	tags := []entities.Tag{
// 		{Name: "Travel"},
// 		{Name: "React.js"},
// 		{Name: "Next.js"},
// 		{Name: "GO (Programming Language)"},
// 	}
// 	result := db.GetDB().Create(tags)
// 	if result.Error != nil {
// 		log.Fatalf("Can't Create Tag Mock Data : %v", result.Error)
// 	}
// }
