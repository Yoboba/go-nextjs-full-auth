package usecases

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
)

type TagUseCase interface {
	CreateTag(tag entities.Tag) error
	GetAllTags() ([]models.Tag, error)
	GetAllTagsFromBlogId(id uint) ([]models.Tag, error)
}
