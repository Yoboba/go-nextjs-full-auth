package usecases

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/user/repositories"
)

type userUseCaseImpl struct {
	repo repositories.UserRepository
}

func NewUserUseCaseImpl(repo repositories.UserRepository) UserUseCase {
	return &userUseCaseImpl{repo: repo}
}

func (u *userUseCaseImpl) GetUserByID(id uint) (entities.User, error) {
	return u.repo.FindUserFromID(id)
}
