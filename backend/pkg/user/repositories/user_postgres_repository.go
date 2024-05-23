package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db *gorm.DB
}

func NewUserPostgresRepository(db *gorm.DB) UserRepository {
	return &userPostgresRepository{db: db}
}

func (u *userPostgresRepository) FindUserFromID(id uint) (entities.User, error) {
	var user entities.User

	result := u.db.Where("id = ?", id).First(&user)
	if result.Error != nil {
		return user, result.Error
	}
	return user, nil
}
