package usecases

import "github.com/Yoboba/GNA/pkg/entities"

type UserUseCase interface {
	GetUserByID(id uint) (entities.User, error)
}
