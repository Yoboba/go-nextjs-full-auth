package handlers

import (
	"github.com/gofiber/fiber/v2"
)

type TagHandler interface {
	CreateTag(c *fiber.Ctx) error
	GetTag(c *fiber.Ctx) error
}
