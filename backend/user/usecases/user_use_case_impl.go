package usecases

import (
	"github.com/Yoboba/GNA/user/entities"
	"github.com/Yoboba/GNA/user/repositories"
)

type UserUseCaseImpl struct {
	repo repositories.UserRepository
}

func NewUserUseCaseImpl(repo repositories.UserRepository) UserUseCase {
	return &UserUseCaseImpl{repo: repo}
}

func (u *UserUseCaseImpl) CreateUser(user entities.User) error {
	return u.repo.Save(user)
}
