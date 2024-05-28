package usecases

import "github.com/Yoboba/GNA/pkg/models"

type BlogUsecase interface {
	GetAll(condition string) ([]models.Blog, error)
	GetLikeFromBlogId(id uint) (models.BlogLike, error)
	GetLikeStatusFromUsernameAndBlogId(username string, id uint) (bool, error)
}
