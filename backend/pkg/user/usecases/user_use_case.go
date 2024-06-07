package usecases

import "github.com/Yoboba/BWA/pkg/models"

type UserUseCase interface {
	GetUserByID(id uint) (models.User, error)
	GetUsers() ([]models.User, error)
}
