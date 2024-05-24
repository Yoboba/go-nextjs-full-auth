package repositories

import "github.com/Yoboba/GNA/pkg/models"

type UserRepository interface {
	FindUserFromID(id uint) (models.User, error)
}
