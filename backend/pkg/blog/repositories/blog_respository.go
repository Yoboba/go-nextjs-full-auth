package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
)

type BlogRepository interface {
	FindAll(condition string) ([]models.Blog, error)
	FindLikeFromBlogId(id uint) (models.BlogLike, error)
	FindLikeStatusFromUsernameAndBlogId(username string, id uint) (bool, error)
	Save(blog entities.Blog) error
}
