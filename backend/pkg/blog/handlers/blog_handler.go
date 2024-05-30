package handlers

import (
	"github.com/gofiber/fiber/v2"
)

type BlogHandler interface {
	GetBlogs(c *fiber.Ctx) error
	GetBlogsByLike(c *fiber.Ctx) error
	GetLikeByBlogId(c *fiber.Ctx) error
	CreatelikeByUserIdAndBlogId(c *fiber.Ctx) error
	DeletelikeByUserIdAndBlogId(c *fiber.Ctx) error
	GetLikeStatusByUsernameAndBlogId(c *fiber.Ctx) error
	CreateBlog(c *fiber.Ctx) error
	UpdateBlog(c *fiber.Ctx) error
	DeleteBlog(c *fiber.Ctx) error
}
