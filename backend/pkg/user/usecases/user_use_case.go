package usecases

import "github.com/Yoboba/GNA/pkg/models"

type UserUseCase interface {
	GetUserByID(id uint) (models.User, error)
	GetUsers() ([]models.User, error)
}
