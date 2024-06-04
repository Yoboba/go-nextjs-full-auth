package handlers

import "github.com/gofiber/fiber/v2"

type UserHandler interface {
	GetUserFromJwt(c *fiber.Ctx) error
	GetUsers(c *fiber.Ctx) error
}
