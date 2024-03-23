package repositories

import "github.com/Yoboba/GNA/app/user/entities"

type UserRepository interface {
	Save(user entities.User) error
	FindFromID(id uint32) entities.User
}
