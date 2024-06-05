package usecases

import (
	"crypto/rand"
	"fmt"
	"net/smtp"
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

func tokenGenerator() string {
	b := make([]byte, 6)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

// SendEmail implements AuthUseCase.
func (a *authUseCaseImpl) SendEmail(email string) error {
	godotenv.Load()
	auth := smtp.PlainAuth("", os.Getenv("SENDER_EMAIL"), os.Getenv("GOOGLE_APP_PASSWORD"), "smtp.gmail.com") // TODO : better keep password and sender email in the .env file
	token := tokenGenerator()                                                                                 // TODO : save token into the database
	msg := []byte(
		"Subject : Password reset token \r\n" +
			"\r\n" +
			"Your code : " + token + "\r\n",
	)
	err := smtp.SendMail("smtp.gmail.com:587", auth, os.Getenv("SENDER_EMAIL"), []string{email}, msg)
	if err != nil {
		return err
	}
	return nil
}

// ValidateEmail implements AuthUseCase.
func (a *authUseCaseImpl) ValidateEmail(email string) error {
	return a.repo.ValidateEmail(email)
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
