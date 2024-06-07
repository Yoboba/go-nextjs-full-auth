package usecases

import (
	"github.com/Yoboba/BWA/pkg/entities"
	"github.com/Yoboba/BWA/pkg/models"
	"github.com/Yoboba/BWA/pkg/tag/repositories"
)

type tagUseCaseImpl struct {
	repo repositories.TagRepository
}

// GetAllTagsFromUserId implements TagUseCase.
func (t *tagUseCaseImpl) GetAllTagsFromBlogId(id uint) ([]models.Tag, error) {
	return t.repo.FindAllFromBlogId(id)
}

func (t *tagUseCaseImpl) CreateTag(tag entities.Tag) error {
	return t.repo.Save(tag)
}

func (t *tagUseCaseImpl) GetAllTags() ([]models.Tag, error) {
	return t.repo.FindAll()
}

func NewTagUseCaseImpl(repo repositories.TagRepository) TagUseCase {
	return &tagUseCaseImpl{repo: repo}
}
