package repositories

import (
	"github.com/Yoboba/GNA/user/entities"
	"gorm.io/gorm"
)

type UserPostgresRepository struct {
	db *gorm.DB
}

func NewUserPostgresRepository(db *gorm.DB) UserRepository {
	return &UserPostgresRepository{db: db}
}

func (u *UserPostgresRepository) Save(user entities.User) error {
	// TODO : need test
	result := u.db.Create(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
