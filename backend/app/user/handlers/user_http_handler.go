package handlers

import (
	"fmt"
	"time"

	"github.com/Yoboba/GNA/app/user/entities"
	"github.com/Yoboba/GNA/app/user/usecases"
	"github.com/gofiber/fiber/v2"
)

type userHttpHandler struct {
	usecase usecases.UserUseCase
}

func NewUserHttpHandler(usecase usecases.UserUseCase) UserHandler {
	return &userHttpHandler{usecase: usecase}
}

func (u *userHttpHandler) Register(c *fiber.Ctx) error {
	tmp := new(entities.User)
	err := c.BodyParser(tmp)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err1 := u.usecase.CreateUser(*tmp)
	if err1 != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "User successfully created!",
	})
}

func (u *userHttpHandler) Login(c *fiber.Ctx) error {
	var user entities.User
	err := c.BodyParser(&user)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	token, err := u.usecase.ValidateUser(user)
	if err != nil {
		fmt.Printf("\nvalidate fail : %v", err)
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Minute * 5),
		HTTPOnly: true,
	})

	return c.JSON(fiber.Map{
		"token": token,
	})
}
