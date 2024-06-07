package repositories

import "github.com/Yoboba/BWA/pkg/models"

type UserRepository interface {
	FindUserFromID(id uint) (models.User, error)
	FindUsers() ([]models.User, error)
}
