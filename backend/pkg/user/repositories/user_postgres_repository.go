package repositories

import (
	"github.com/Yoboba/GNA/pkg/models"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db *gorm.DB
}

func NewUserPostgresRepository(db *gorm.DB) UserRepository {
	return &userPostgresRepository{db: db}
}

func (u *userPostgresRepository) FindUserFromID(id uint) (models.User, error) {
	var user models.User

	result := u.db.Where("id = ?", id).Preload("Role").Find(&user)
	if result.Error != nil {
		return user, result.Error
	}
	return user, nil
}
