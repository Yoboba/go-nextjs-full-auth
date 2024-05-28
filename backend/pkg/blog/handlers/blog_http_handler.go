package handlers

import (
	"fmt"
	"strconv"

	"github.com/Yoboba/GNA/pkg/blog/usecases"
	"github.com/Yoboba/GNA/pkg/common"
	"github.com/gofiber/fiber/v2"
)

type blogHttpHandler struct {
	usecase usecases.BlogUsecase
}

// GetLikeStatusByUsernameAndBlogId implements BlogHandler.
func (b *blogHttpHandler) GetLikeStatusByUsernameAndBlogId(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "GetLikeStatusByUsernameAndBlogId")
	q := c.Queries()

	if q["username"] == "" || q["blogId"] == "" {
		return common.Response(c, nil, "username or blogId is missing", fiber.StatusBadRequest, "")
	}

	id, err := strconv.ParseInt(q["blogId"], 10, 64)
	if err != nil {
		return common.Response(c, nil, "cannot parse blogId to Integer", fiber.StatusBadRequest, err.Error())
	}

	status, err := b.usecase.GetLikeStatusFromUsernameAndBlogId(q["username"], uint(id))
	if err != nil {
		return common.Response(c, nil, "cannot retrieve like status from the database", fiber.StatusInternalServerError, err.Error())
	}
	return common.Response(c, status, "like status retrieved successfully", fiber.StatusOK, "")
}

// GetLikeByBlogId implements BlogHandler.
func (b *blogHttpHandler) GetLikeByBlogId(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "GetLikeByBlogId")
	blog_id, err := strconv.ParseInt(c.Params("blogId"), 10, 64)
	if err != nil {
		return common.Response(c, nil, "cannot parse blogId to Integer", fiber.StatusBadRequest, err.Error())
	}
	like, err := b.usecase.GetLikeFromBlogId(uint(blog_id))
	if err != nil {
		return common.Response(c, nil, "cannot retrieve like from the database", fiber.StatusInternalServerError, err.Error())
	}
	return common.Response(c, like, "like retrieved successfully", fiber.StatusOK, "")
}

// GetBlogs implements BlogHandler.
func (b *blogHttpHandler) GetBlogs(c *fiber.Ctx) error {
	// userId, tagId
	fmt.Println(c.Path(), "GetBlogs")
	q := c.Queries()
	condition := ""

	if q["userId"] != "" {
		condition += "user_id = " + q["userId"]
	}
	if q["tagId"] != "" {
		if q["userId"] != "" {
			condition += " AND " + "tag_id = " + q["tagId"]
		} else {
			condition += "tag_id = " + q["tagId"]
		}
	}

	blogs, err := b.usecase.GetAll(condition)
	if err != nil {
		return common.Response(c, nil, "cannot retrieve blogs from the database", fiber.StatusInternalServerError, err.Error())
	}
	if len(blogs) == 0 {
		return common.Response(c, nil, "no blogs found", fiber.StatusNotFound, "")
	}
	return common.Response(c, blogs, "blogs retrieved successfully", fiber.StatusOK, "")
}

func NewBlogHttpHandler(usecase usecases.BlogUsecase) BlogHandler {
	return &blogHttpHandler{usecase: usecase}
}
