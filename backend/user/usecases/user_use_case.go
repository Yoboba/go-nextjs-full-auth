package usecases

import "github.com/Yoboba/GNA/user/entities"

type UserUseCase interface {
	CreateUser(user entities.User) error
}
