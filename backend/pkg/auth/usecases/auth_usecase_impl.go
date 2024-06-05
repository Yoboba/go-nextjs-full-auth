package usecases

import (
	"crypto/rand"
	"fmt"
	"net/smtp"
	"os"
	"time"

	"github.com/Yoboba/GNA/pkg/auth/repositories"
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

type authUseCaseImpl struct {
	repo repositories.AuthRepository
}

// ResetPassword implements AuthUseCase.
func (a *authUseCaseImpl) ResetPassword(token string, userId uint, newPassword string) error {
	_, tokenMatchedErr := a.repo.FindMatchToken(token)
	if tokenMatchedErr != nil {
		return tokenMatchedErr
	}
	hashedPassword, hashedErr := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if hashedErr != nil {
		return hashedErr
	}
	updatePasswordErr := a.repo.UpdatePassword(userId, string(hashedPassword))
	if updatePasswordErr != nil {
		return updatePasswordErr
	}
	return nil
}

// VerifyToken implements AuthUseCase.
func (a *authUseCaseImpl) VerifyToken(userToken string) (uint, error) {
	token, verifyErr := a.repo.FindMatchToken(userToken)
	if verifyErr != nil {
		return 0, verifyErr
	}
	if time.Now().After(token.ExpiresAt) {
		return 0, fmt.Errorf("token already expired")
	}
	return token.UserID, nil
}

// ValidateEmail implements AuthUseCase.
func (a *authUseCaseImpl) ValidateEmail(email string) error {
	_, validateEmailErr := a.repo.ValidateEmailAndGetUser(email)
	if validateEmailErr != nil {
		return validateEmailErr
	}
	return nil
}

func tokenGenerator() string {
	b := make([]byte, 6)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

// SendEmail implements AuthUseCase.
func (a *authUseCaseImpl) SendEmail(user models.User) error {
	var token entities.PasswordResetToken
	godotenv.Load()
	auth := smtp.PlainAuth("", os.Getenv("SENDER_EMAIL"), os.Getenv("GOOGLE_APP_PASSWORD"), "smtp.gmail.com")
	randomToken := tokenGenerator()

	token.UserID = user.ID
	token.Token = randomToken
	token.ExpiresAt = time.Now().Add(time.Minute * 2)
	saveTokenErr := a.repo.SavePasswordResetToken(token)
	if saveTokenErr != nil {
		return saveTokenErr
	}

	msg := []byte(
		"Subject : Password reset token \r\n" +
			"\r\n" +
			"Your code : " + randomToken + "\r\n",
	)
	err := smtp.SendMail("smtp.gmail.com:587", auth, os.Getenv("SENDER_EMAIL"), []string{user.Email}, msg)
	if err != nil {
		return err
	}
	return nil
}

// GetUserByEmail implements AuthUseCase.
func (a *authUseCaseImpl) GetUserByEmail(email string) (models.User, error) {
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
	serverUser, validateEmailErr := a.repo.ValidateEmailAndGetUser(user.Email)
	if validateEmailErr != nil {
		return "", validateEmailErr
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(serverUser.Password), []byte(user.Password))
	if passwordErr != nil {
		return "", passwordErr
	}

	godotenv.Load()
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = serverUser.ID
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
