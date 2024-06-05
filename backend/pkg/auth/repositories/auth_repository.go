package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
)

type AuthRepository interface {
	FindUserByEmail(email string) (models.User, error)
	SaveUser(user entities.User) error
	ValidateEmailAndGetUser(email string) (entities.User, error)
	SavePasswordResetToken(token entities.PasswordResetToken) error
	FindMatchToken(userToken string) (entities.PasswordResetToken, error)
	UpdatePassword(userId uint, newPassword string) error
}
