package usecases

import (
	"github.com/Yoboba/BWA/pkg/entities"
	"github.com/Yoboba/BWA/pkg/models"
)

type BlogUsecase interface {
	GetAll(condition string) ([]models.Blog, error)
	GetFromId(id uint) (models.Blog, error)
	GetFromLike(id uint) ([]models.Blog, error)
	GetLikeFromBlogId(id uint) (models.BlogLike, error)
	CreateLikeFromBlogIdAndUserId(userId uint, blogId uint) error
	DeleteLikeFromBlogIdAndUserId(userId uint, blogId uint) error
	GetLikeStatusFromUsernameAndBlogId(username string, id uint) (bool, error)
	CreateBlog(blog entities.Blog) error
	UpdateBlog(blog entities.Blog) error
	DeleteBlog(id uint) error
}
