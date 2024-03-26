package usecases

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/tag/repositories"
)

type tagUseCaseImpl struct {
	repo repositories.TagRepository
}

func NewTagUseCaseImpl(repo repositories.TagRepository) TagUseCase {
	return &tagUseCaseImpl{repo: repo}
}

func (t *tagUseCaseImpl) CreateTag(tag entities.Tag) error {
	return t.repo.Save(tag)
}

func (t *tagUseCaseImpl) GetAllTags() ([]entities.Tag, error) {
	return t.repo.FindAll()
}
