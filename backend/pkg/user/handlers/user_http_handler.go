package handlers

import (
	"fmt"

	"github.com/Yoboba/GNA/pkg/common"
	"github.com/Yoboba/GNA/pkg/user/usecases"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type userHttpHandler struct {
	usecase usecases.UserUseCase
}

// GetUsers implements UserHandler.
func (u *userHttpHandler) GetUsers(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "GetUsers")
	users, err := u.usecase.GetUsers()
	if err != nil {
		return common.Response(c, nil, "cannot retrieve users from the database", fiber.StatusInternalServerError, err.Error())
	}
	return common.Response(c, users, "successfully retrieve users", fiber.StatusOK, "")
}

// GetUser implements UserHandler.
func (u *userHttpHandler) GetUserFromJwt(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "GetUserFromJwt")
	token := c.Locals("user").(*jwt.Token)
	userId := token.Claims.(jwt.MapClaims)["user_id"]

	user, err := u.usecase.GetUserByID(uint(userId.(float64)))
	if err != nil {
		return common.Response(c, nil, "user not found", fiber.StatusNotFound, err.Error())
	}

	return common.Response(c, user, "user founded", fiber.StatusOK, "")
}

func NewUserHttpHandler(usecase usecases.UserUseCase) UserHandler {
	return &userHttpHandler{usecase: usecase}
}
