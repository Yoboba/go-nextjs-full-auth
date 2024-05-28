package usecases

import "github.com/Yoboba/GNA/pkg/entities"

type AuthUseCase interface {
	GetUserByEmail(email string) (entities.User, error)
	CreateUser(user entities.User) error
	ValidateUser(user entities.User) (string, error)
}
