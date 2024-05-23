package handlers

import "github.com/gofiber/fiber/v2"

type UserHandler interface {
	GetUserByID(c *fiber.Ctx) error
}
