package repositories

import "github.com/Yoboba/GNA/pkg/entities"

type UserRepository interface {
	FindUserFromID(id uint) (entities.User, error)
}
