package usecases

import (
	"github.com/Yoboba/BWA/pkg/entities"
	"github.com/Yoboba/BWA/pkg/models"
)

type AuthUseCase interface {
	GetUserByEmail(email string) (models.User, error)
	CreateUser(user entities.User) error
	ValidateUser(user entities.User) (string, error)
	ValidateEmail(email string) error
	SendEmail(user models.User) error
	VerifyToken(userToken string) (uint, error)
	ResetPassword(token string, userId uint, newPassword string) error
}
