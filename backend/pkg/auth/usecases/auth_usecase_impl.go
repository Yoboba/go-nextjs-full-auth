package usecases

import (
	"os"
	"time"

	"github.com/Yoboba/GNA/pkg/auth/repositories"
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

type authUseCaseImpl struct {
	repo repositories.AuthRepository
}

// GetUserByEmail implements AuthUseCase.
func (a *authUseCaseImpl) GetUserByEmail(email string) (entities.User, error) {
	return a.repo.FindUserByEmail(email)
}

// CreateUser implements AuthUseCase.
func (a *authUseCaseImpl) CreateUser(user entities.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	return a.repo.SaveUser(user)
}

// ValidateUser implements AuthUseCase.
func (a *authUseCaseImpl) ValidateUser(user entities.User) (string, error) {
	id, password, emailErr := a.repo.ValidateEmailAndGetPassword(user.Email)
	if emailErr != nil {
		return "", emailErr
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(password), []byte(user.Password))
	if passwordErr != nil {
		return "", passwordErr
	}

	godotenv.Load()
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

func NewAuthUseCaseImpl(repo repositories.AuthRepository) AuthUseCase {
	return &authUseCaseImpl{
		repo: repo,
	}
}
