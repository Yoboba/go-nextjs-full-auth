package usecases

import "github.com/Yoboba/GNA/pkg/entities"

type TagUseCase interface {
	CreateTag(tag entities.Tag) error
	GetAllTags() ([]entities.Tag, error)
	GetAllTagsFromBlogId(id uint) ([]entities.Tag, error)
}
