package repositories

import "github.com/Yoboba/GNA/user/entities"

type UserRepository interface {
	Save(user entities.User) error
}
