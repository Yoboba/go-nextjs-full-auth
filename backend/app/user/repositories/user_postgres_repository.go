package repositories

import (
	"log"

	"github.com/Yoboba/GNA/app/user/entities"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db *gorm.DB
}

func NewUserPostgresRepository(db *gorm.DB) UserRepository {
	return &userPostgresRepository{db: db}
}

func (u *userPostgresRepository) Save(user entities.User) error {
	result := u.db.Create(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (u *userPostgresRepository) FindFromID(id uint32) entities.User {
	var user entities.User
	result := u.db.First(&user, id)
	if result.Error != nil {
		log.Fatalf("Error finding user : %v", result.Error)
	}
	return user
}
