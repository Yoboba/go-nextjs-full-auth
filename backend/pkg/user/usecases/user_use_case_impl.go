package usecases

import (
	"fmt"
	"os"
	"time"

	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/user/repositories"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
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

func (u *userUseCaseImpl) ValidateUser(user entities.User) (string, error) {
	id, password, emailErr := u.repo.ValidateEmailAndGetPassword(user.Email)
	if emailErr != nil {
		return "", emailErr
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(password), []byte(user.Password))
	if passwordErr != nil {
		return "", passwordErr
	}

	godotenv.Load()
	fmt.Println(id)
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = id
	claims["exp"] = time.Now().Add(time.Minute * 5).Unix() // <- 5 minutes

	t, err := token.SignedString([]byte(os.Getenv("jwtSecret"))) // <- from .env
	if err != nil {
		return "", err
	}

	return t, nil
}
