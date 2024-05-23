package handlers

import "github.com/gofiber/fiber/v2"

type AuthHandler interface {
	SignUp(c *fiber.Ctx) error
	SignIn(c *fiber.Ctx) error
}
