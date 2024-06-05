package repositories

import "github.com/Yoboba/GNA/pkg/entities"

type AuthRepository interface {
	FindUserByEmail(email string) (entities.User, error)
	SaveUser(user entities.User) error
	ValidateEmail(email string) error
	ValidateEmailAndGetPassword(email string) (uint, string, error)
}
