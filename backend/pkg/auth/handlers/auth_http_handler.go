package handlers

import (
	"fmt"
	"time"

	"github.com/Yoboba/GNA/pkg/auth/usecases"
	"github.com/Yoboba/GNA/pkg/common"
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/gofiber/fiber/v2"
)

type authHttpHandler struct {
	usecase usecases.AuthUseCase
}

// SignIn implements AuthHandler.
func (a *authHttpHandler) SignIn(c *fiber.Ctx) error {
	var user entities.User
	err := c.BodyParser(&user)
	if err != nil {
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	token, err := a.usecase.ValidateUser(user)
	if err != nil {
		return common.Response(c, nil, "validate failed", fiber.StatusUnauthorized, err.Error())
	}

	user1, err := a.usecase.GetUserByEmail(user.Email)
	if err != nil {
		return common.Response(c, nil, "user not found", fiber.StatusNotFound, err.Error())
	}

	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Minute * 5), // 5 minutes
		HTTPOnly: true,
		SameSite: "None",
	})
	c.Cookie(&fiber.Cookie{
		Name:     "username",
		Value:    user1.Username,
		Expires:  time.Now().Add(time.Minute * 5), // 5 minutes
		HTTPOnly: true,
		SameSite: "None",
	})

	fmt.Println(c.Path(), "SignIn")
	return common.Response(c, "jwt token sent via cookie", "token generated", fiber.StatusOK, "")
}

// SignUp implements AuthHandler.
func (a *authHttpHandler) SignUp(c *fiber.Ctx) error {
	tmp := new(entities.User)
	err := c.BodyParser(tmp)
	if err != nil {
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	err1 := a.usecase.CreateUser(*tmp)
	if err1 != nil {
		return common.Response(c, nil, "cannot register", fiber.StatusInternalServerError, err1.Error())
	}
	fmt.Println(c.Path(), "SignUp")
	return common.Response(c, nil, "user successfully created", fiber.StatusOK, "")
}

func NewAuthHttpHandler(usecase usecases.AuthUseCase) AuthHandler {
	return &authHttpHandler{usecase}
}
