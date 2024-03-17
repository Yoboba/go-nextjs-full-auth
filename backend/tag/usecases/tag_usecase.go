package usecases

import "github.com/Yoboba/GNA/tag/entities"

type TagUseCase interface {
	CreateTag(tag entities.Tag) error
	GetAllTags() ([]entities.Tag, error)
}
