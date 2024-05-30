package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
)

type BlogRepository interface {
	FindAll(condition string) ([]models.Blog, error)
	FindFromLike(id uint) ([]models.Blog, error)
	FindLikeFromBlogId(id uint) (models.BlogLike, error)
	SaveLikeFromBlogIdAndUserId(userId uint, blogId uint) error
	DeleteLikeFromBlogIdAndUserId(userId uint, blogId uint) error
	FindLikeStatusFromUsernameAndBlogId(username string, id uint) (bool, error)
	Save(blog entities.Blog) error
	Update(blog entities.Blog) error
	Delete(id uint) error
}
