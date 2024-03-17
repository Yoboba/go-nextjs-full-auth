package handlers

import (
	"github.com/Yoboba/GNA/tag/entities"
	"github.com/Yoboba/GNA/tag/usecases"
	"github.com/gofiber/fiber/v2"
)

type tagHttpHandler struct {
	usecase usecases.TagUseCase
}

func NewTagHttpHandler(usecase usecases.TagUseCase) TagHandler {
	return &tagHttpHandler{usecase: usecase}
}

func (t *tagHttpHandler) CreateTag(c *fiber.Ctx) error {
	tmp := new(entities.Tag)
	err := c.BodyParser(tmp)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	err1 := t.usecase.CreateTag(*tmp)
	if err1 != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Tag created successfully!",
	})
}

func (t *tagHttpHandler) GetTag(c *fiber.Ctx) error {
	tags, err := t.usecase.GetAllTags()
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.JSON(tags)
}
