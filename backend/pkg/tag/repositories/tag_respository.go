package repositories

import (
	"github.com/Yoboba/BWA/pkg/entities"
	"github.com/Yoboba/BWA/pkg/models"
)

type TagRepository interface {
	Save(tag entities.Tag) error
	FindAll() ([]models.Tag, error)
	FindAllFromBlogId(id uint) ([]models.Tag, error)
}
