package usecases

import "github.com/Yoboba/GNA/app/user/entities"

type UserUseCase interface {
	CreateUser(user entities.User) error
	GetUser(id uint32) entities.User
}
