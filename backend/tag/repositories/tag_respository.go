package repositories

import "github.com/Yoboba/GNA/tag/entities"

type TagRepository interface {
	Save(tag entities.Tag) error
	FindAll() ([]entities.Tag, error)
}
