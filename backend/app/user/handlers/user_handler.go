package handlers

import "github.com/gofiber/fiber/v2"

type UserHandler interface {
	Register(c *fiber.Ctx) error
	GetUser(c *fiber.Ctx) error
}
