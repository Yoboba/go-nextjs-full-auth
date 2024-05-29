package usecases

import (
	"github.com/Yoboba/GNA/pkg/blog/repositories"
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
)

type blogUseCaseImpl struct {
	repo repositories.BlogRepository
}

// DeleteBlog implements BlogUsecase.
func (b *blogUseCaseImpl) DeleteBlog(id uint) error {
	return b.repo.Delete(id)
}

// UpdateBlog implements BlogUsecase.
func (b *blogUseCaseImpl) UpdateBlog(blog entities.Blog) error {
	return b.repo.Update(blog)
}

// CreateBlog implements BlogUsecase.
func (b *blogUseCaseImpl) CreateBlog(blog entities.Blog) error {
	return b.repo.Save(blog)
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
