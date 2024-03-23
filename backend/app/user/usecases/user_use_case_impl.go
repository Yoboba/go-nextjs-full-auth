package usecases

import (
	"github.com/Yoboba/GNA/app/user/entities"
	"github.com/Yoboba/GNA/app/user/repositories"
	"golang.org/x/crypto/bcrypt"
)

type userUseCaseImpl struct {
	repo repositories.UserRepository
}

func NewUserUseCaseImpl(repo repositories.UserRepository) UserUseCase {
	return &userUseCaseImpl{repo: repo}
}

func (u *userUseCaseImpl) CreateUser(user entities.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	return u.repo.Save(user)
}

func (u *userUseCaseImpl) GetUser(id uint32) entities.User {
	return u.repo.FindFromID(id)
}
