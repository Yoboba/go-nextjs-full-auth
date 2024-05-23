package repositories

import "github.com/Yoboba/GNA/pkg/entities"

type AuthRepository interface {
	SaveUser(user entities.User) error
	ValidateEmailAndGetPassword(email string) (uint, string, error)
}
