package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
)

type TagRepository interface {
	Save(tag entities.Tag) error
	FindAll() ([]models.Tag, error)
	FindAllFromBlogId(id uint) ([]models.Tag, error)
}
