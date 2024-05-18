package handlers

import (
	"github.com/Yoboba/GNA/pkg/common"
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/tag/usecases"
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
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	err1 := t.usecase.CreateTag(*tmp)
	if err1 != nil {
		return common.Response(c, nil, "cannot create tag", fiber.StatusInternalServerError, err1.Error())
	}

	return common.Response(c, nil, "tag successfully created", fiber.StatusOK, "")
}

func (t *tagHttpHandler) GetTag(c *fiber.Ctx) error {
	tags, err := t.usecase.GetAllTags()
	if err != nil {
		return common.Response(c, nil, "cannot get tags from the database", fiber.StatusInternalServerError, err.Error())
	}
	return common.Response(c, tags, "successfully get all the tags", fiber.StatusOK, "")
}
