package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
)

type TagRepository interface {
	Save(tag entities.Tag) error
	FindAll() ([]entities.Tag, error)
	FindAllFromBlogId(id uint) ([]entities.Tag, error)
}
