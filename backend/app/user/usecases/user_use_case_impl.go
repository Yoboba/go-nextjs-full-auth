package usecases

import (
	"os"
	"time"

	"github.com/Yoboba/GNA/app/user/entities"
	"github.com/Yoboba/GNA/app/user/repositories"
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

	result, err := u.repo.FindFromUsername(user.Username)
	if err != nil {
		return "", err
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(user.Password))
	if passwordErr != nil {
		return "", err
	}

	godotenv.Load()

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte(os.Getenv("jwtSecret"))) // <- from .env
	if err != nil {
		return "", err
	}

	return t, nil
}
