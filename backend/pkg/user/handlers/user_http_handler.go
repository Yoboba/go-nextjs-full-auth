package handlers

import (
	"time"

	"github.com/Yoboba/GNA/pkg/common"
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/user/usecases"
	"github.com/gofiber/fiber/v2"
)

type userHttpHandler struct {
	usecase usecases.UserUseCase
}

func NewUserHttpHandler(usecase usecases.UserUseCase) UserHandler {
	return &userHttpHandler{usecase: usecase}
}

func (u *userHttpHandler) SignUp(c *fiber.Ctx) error {
	tmp := new(entities.User)
	err := c.BodyParser(tmp)
	if err != nil {
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	err1 := u.usecase.CreateUser(*tmp)
	if err1 != nil {
		return common.Response(c, nil, "cannot register", fiber.StatusInternalServerError, err1.Error())
	}

	return common.Response(c, nil, "user successfully created", fiber.StatusOK, "")
}

func (u *userHttpHandler) SignIn(c *fiber.Ctx) error {
	var user entities.User
	err := c.BodyParser(&user)
	if err != nil {
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	token, err := u.usecase.ValidateUser(user)
	if err != nil {
		return common.Response(c, nil, "validate failed", fiber.StatusUnauthorized, err.Error())
	}

	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Minute * 5),
		HTTPOnly: true,
		SameSite: "None",
	})

	return common.Response(c, "jwt token sent via cookie", "token generated", fiber.StatusOK, "")
}
