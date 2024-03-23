package repositories

import "github.com/Yoboba/GNA/app/user/entities"

type UserRepository interface {
	Save(user entities.User) error
	FindFromUsername(username string) (entities.User, error)
}
