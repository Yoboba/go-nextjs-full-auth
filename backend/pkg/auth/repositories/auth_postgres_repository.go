package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
	"gorm.io/gorm"
)

type authPostgresRepository struct {
	db *gorm.DB
}

// UpdatePassword implements AuthRepository.
func (a *authPostgresRepository) UpdatePassword(userId uint, newPassword string) error {
	var user entities.User
	result := a.db.Where("id = ?", userId).First(&user)
	if result.Error != nil {
		return result.Error
	}
	user.Password = newPassword
	updateResult := a.db.Save(&user)
	if updateResult.Error != nil {
		return updateResult.Error
	}
	return nil
}

// FindMatchToken implements AuthRepository.
func (a *authPostgresRepository) FindMatchToken(userToken string) (entities.PasswordResetToken, error) {
	var token entities.PasswordResetToken
	result := a.db.Where("token = ?", userToken).First(&token)
	if result.Error != nil {
		return token, result.Error
	}
	return token, nil
}

// SavePasswordResetToken implements AuthRepository.
func (a *authPostgresRepository) SavePasswordResetToken(token entities.PasswordResetToken) error {
	result := a.db.Create(&token)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// FindUserByEmail implements AuthRepository.
func (a *authPostgresRepository) FindUserByEmail(email string) (models.User, error) {
	var user models.User

	result := a.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return models.User{}, result.Error
	}
	return user, nil
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
func (a *authPostgresRepository) ValidateEmailAndGetUser(email string) (entities.User, error) {
	var user entities.User

	result := a.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return user, result.Error
	}
	return user, nil
}

func NewAuthPostgresRepository(db *gorm.DB) AuthRepository {
	return &authPostgresRepository{db: db}
}
