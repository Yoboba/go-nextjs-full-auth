package handlers

import (
	"github.com/Yoboba/GNA/pkg/user/usecases"
	"github.com/gofiber/fiber/v2"
)

type userHttpHandler struct {
	usecase usecases.UserUseCase
}

// GetUserByID implements UserHandler.
func (u *userHttpHandler) GetUserByID(c *fiber.Ctx) error {
	// TODO : implement the GetUserByID method
	return nil
}

func NewUserHttpHandler(usecase usecases.UserUseCase) UserHandler {
	return &userHttpHandler{usecase: usecase}
}
