package handlers

import "github.com/gofiber/fiber/v2"

type UserHandler interface {
	SignUp(c *fiber.Ctx) error
	SignIn(c *fiber.Ctx) error
}
