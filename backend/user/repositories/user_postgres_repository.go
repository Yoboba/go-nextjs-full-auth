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
	// TODO: save/create user to postgres DB
	return nil
}
