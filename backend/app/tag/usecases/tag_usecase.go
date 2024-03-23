package usecases

import "github.com/Yoboba/GNA/app/tag/entities"

type TagUseCase interface {
	CreateTag(tag entities.Tag) error
	GetAllTags() ([]entities.Tag, error)
}
