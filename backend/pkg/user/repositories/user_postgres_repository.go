package repositories

import (
	"github.com/Yoboba/GNA/pkg/models"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db *gorm.DB
}

// FindUsers implements UserRepository.
func (u *userPostgresRepository) FindUsers() ([]models.User, error) {
	var users []models.User
	result := u.db.Preload("Role").Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return users, nil
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
