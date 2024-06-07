package usecases

import (
	"github.com/Yoboba/BWA/pkg/models"
	"github.com/Yoboba/BWA/pkg/user/repositories"
)

type userUseCaseImpl struct {
	repo repositories.UserRepository
}

// GetUsers implements UserUseCase.
func (u *userUseCaseImpl) GetUsers() ([]models.User, error) {
	return u.repo.FindUsers()
}

func NewUserUseCaseImpl(repo repositories.UserRepository) UserUseCase {
	return &userUseCaseImpl{repo: repo}
}

func (u *userUseCaseImpl) GetUserByID(id uint) (models.User, error) {
	return u.repo.FindUserFromID(id)
}
