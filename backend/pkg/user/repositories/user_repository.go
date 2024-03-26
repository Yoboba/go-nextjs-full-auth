package repositories

import "github.com/Yoboba/GNA/pkg/entities"

type UserRepository interface {
	Save(user entities.User) error
	FindFromUsername(username string) (entities.User, error)
}
