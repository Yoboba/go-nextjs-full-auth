package handlers

import (
	"fmt"
	"strconv"

	"github.com/Yoboba/GNA/pkg/blog/usecases"
	"github.com/Yoboba/GNA/pkg/common"
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type blogHttpHandler struct {
	usecase usecases.BlogUsecase
}

// DeletelikeByUserIdAndBlogId implements BlogHandler.
func (b *blogHttpHandler) DeletelikeByUserIdAndBlogId(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "DeletelikeByUserIdAndBlogId")
	blogId, parseErr := strconv.ParseInt(c.Params("blogId"), 10, 64)
	if parseErr != nil {
		return common.Response(c, nil, common.ParseError, fiber.StatusBadRequest, parseErr.Error())
	}
	token := c.Locals("user").(*jwt.Token)
	userId := token.Claims.(jwt.MapClaims)["user_id"]

	deleteLikeErr := b.usecase.DeleteLikeFromBlogIdAndUserId(uint(userId.(float64)), uint(blogId))
	if deleteLikeErr != nil {
		return common.Response(c, nil, "cannot add like to the database", fiber.StatusInternalServerError, deleteLikeErr.Error())
	}
	return common.Response(c, nil, "Delete like successfully", fiber.StatusOK, "")
}

// CreatelikeByUserIdAndBlogId implements BlogHandler.
func (b *blogHttpHandler) CreatelikeByUserIdAndBlogId(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "CreatelikeByUserIdAndBlogId")
	blogId, parseErr := strconv.ParseInt(c.Params("blogId"), 10, 64)
	if parseErr != nil {
		return common.Response(c, nil, common.ParseError, fiber.StatusBadRequest, parseErr.Error())
	}
	token := c.Locals("user").(*jwt.Token)
	userId := token.Claims.(jwt.MapClaims)["user_id"]

	createLikeErr := b.usecase.CreateLikeFromBlogIdAndUserId(uint(userId.(float64)), uint(blogId))
	if createLikeErr != nil {
		return common.Response(c, nil, "cannot add like to the database", fiber.StatusInternalServerError, createLikeErr.Error())
	}
	return common.Response(c, nil, "create like successfully", fiber.StatusOK, "")
}

// DeleteBlog implements BlogHandler.
func (b *blogHttpHandler) DeleteBlog(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "DeleteBlog")
	blog_id, err := strconv.ParseInt(c.Params("blogId"), 10, 64)
	if err != nil {
		return common.Response(c, nil, common.ParseError, fiber.StatusBadRequest, err.Error())
	}
	err1 := b.usecase.DeleteBlog(uint(blog_id))
	if err1 != nil {
		return common.Response(c, nil, "cannot delete blog", fiber.StatusInternalServerError, err1.Error())
	}
	return common.Response(c, nil, "delete blog successfully", fiber.StatusOK, "")
}

// UpdateBlog implements BlogHandler.
func (b *blogHttpHandler) UpdateBlog(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "UpdateBlog")
	var blog entities.Blog
	err := c.BodyParser(&blog)
	if err != nil {
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	token := c.Locals("user").(*jwt.Token)
	userId := token.Claims.(jwt.MapClaims)["user_id"]
	blog.UserID = uint(userId.(float64))

	err = b.usecase.UpdateBlog(blog)
	if err != nil {
		return common.Response(c, nil, "cannot create blog", fiber.StatusInternalServerError, err.Error())
	}
	return common.Response(c, nil, "blog successfully created", fiber.StatusOK, "")
}

// CreateBlog implements BlogHandler.
func (b *blogHttpHandler) CreateBlog(c *fiber.Ctx) error {
	var blog entities.Blog
	fmt.Println(c.Path(), "CreateBlog")
	err := c.BodyParser(&blog)
	if err != nil {
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	token := c.Locals("user").(*jwt.Token)
	userId := token.Claims.(jwt.MapClaims)["user_id"]
	blog.UserID = uint(userId.(float64))

	err = b.usecase.CreateBlog(blog)
	if err != nil {
		return common.Response(c, nil, "cannot create blog", fiber.StatusInternalServerError, err.Error())
	}
	return common.Response(c, nil, "blog successfully created", fiber.StatusOK, "")
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
		return common.Response(c, nil, common.ParseError, fiber.StatusBadRequest, err.Error())
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
		return common.Response(c, nil, common.ParseError, fiber.StatusBadRequest, err.Error())
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
