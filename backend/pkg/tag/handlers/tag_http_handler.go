package handlers

import (
	"fmt"
	"strconv"

	"github.com/Yoboba/BWA/pkg/common"
	"github.com/Yoboba/BWA/pkg/entities"
	"github.com/Yoboba/BWA/pkg/tag/usecases"
	"github.com/gofiber/fiber/v2"
)

type tagHttpHandler struct {
	usecase usecases.TagUseCase
}

// GetTagFromBlogId implements TagHandler.
func (t *tagHttpHandler) GetTagFromBlogId(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "GetTagFromBlogId")
	blogId, err := strconv.ParseInt(c.Params("blogId"), 10, 64)
	if err != nil {
		return common.Response(c, nil, "cannot parse blogId to Integer", fiber.StatusBadRequest, err.Error())
	}
	tags, err := t.usecase.GetAllTagsFromBlogId(uint(blogId))
	if err != nil {
		return common.Response(c, nil, "cannot get tags from the database", fiber.StatusInternalServerError, err.Error())
	}
	return common.Response(c, tags, "successfully get all the tags", fiber.StatusOK, "")
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
	fmt.Println(c.Path(), "CreateTag")
	return common.Response(c, nil, "tag successfully created", fiber.StatusOK, "")
}

func (t *tagHttpHandler) GetTag(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "GetTag")

	tags, err := t.usecase.GetAllTags()
	if err != nil {
		return common.Response(c, nil, "cannot get tags from the database", fiber.StatusInternalServerError, err.Error())
	}
	return common.Response(c, tags, "successfully get all the tags", fiber.StatusOK, "")
}
