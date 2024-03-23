package usecases

import "github.com/Yoboba/GNA/app/user/entities"

type UserUseCase interface {
	CreateUser(user entities.User) error
	ValidateUser(user entities.User) (string, error)
}
