package main

import (
	"log"

	"github.com/Yoboba/GNA/app/user/entities"
	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	userMigrate(db)
	createUserMockData(db)
}

func userMigrate(db database.Database) {
	err := db.GetDB().AutoMigrate(&entities.User{})
	if err != nil {
		log.Fatalf("\nCannot Migrate User : %v", err)
	}
}

func createUserMockData(db database.Database) {
	users := []entities.User{
		{Username: "Yobubble", Email: "thanachot.onl@student.mahidol.ac.th", Password: "123sd2", RoleID: 2},
		{Username: "Prisma", Email: "Nanthapat.wat@student.mahidol.ac.th", Password: "aw12345dd", RoleID: 3},
	}

	result := db.GetDB().Create(users)
	if result.Error != nil {
		log.Fatalf("\nCannot Create users Mock Data : %v", result.Error)
	}
}
