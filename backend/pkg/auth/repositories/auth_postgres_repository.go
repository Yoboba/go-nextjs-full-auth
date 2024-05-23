package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"gorm.io/gorm"
)

type authPostgresRepository struct {
	db *gorm.DB
}

func NewAuthPostgresRepository(db *gorm.DB) AuthRepository {
	return &authPostgresRepository{db: db}
}

// SaveUser implements AuthRepository.
func (a *authPostgresRepository) SaveUser(user entities.User) error {
	result := a.db.Create(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// ValidateEmailAndGetPassword implements AuthRepository.
func (a *authPostgresRepository) ValidateEmailAndGetPassword(email string) (uint, string, error) {
	var user entities.User

	result := a.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return 0, "", result.Error
	}
	return user.ID, user.Password, nil
}
