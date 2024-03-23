package handlers

import (
	"strconv"

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

// CreateUser implements UserHandler.
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

func (u *userHttpHandler) GetUser(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	user := u.usecase.GetUser(uint32(id))
	return c.JSON(user)
}
