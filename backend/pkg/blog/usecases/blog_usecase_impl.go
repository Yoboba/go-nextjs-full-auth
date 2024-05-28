package usecases

import (
	"github.com/Yoboba/GNA/pkg/blog/repositories"
	"github.com/Yoboba/GNA/pkg/models"
)

type blogUseCaseImpl struct {
	repo repositories.BlogRepository
}

// GetLikeStatusFromUsernameAndBlogId implements BlogUsecase.
func (b *blogUseCaseImpl) GetLikeStatusFromUsernameAndBlogId(username string, id uint) (bool, error) {
	return b.repo.FindLikeStatusFromUsernameAndBlogId(username, id)
}

// GetLikeFromBlogId implements BlogUsecase.
func (b *blogUseCaseImpl) GetLikeFromBlogId(id uint) (models.BlogLike, error) {
	return b.repo.FindLikeFromBlogId(id)
}

// GetAll implements BlogUsecase.
func (b *blogUseCaseImpl) GetAll(condition string) ([]models.Blog, error) {
	return b.repo.FindAll(condition)
}

func NewBlogUseCaseImpl(repo repositories.BlogRepository) BlogUsecase {
	return &blogUseCaseImpl{repo: repo}
}
