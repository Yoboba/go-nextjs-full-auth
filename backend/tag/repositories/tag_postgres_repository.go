package repositories

import (
	"github.com/Yoboba/GNA/tag/entities"
	"gorm.io/gorm"
)

type tagPostgresRepository struct {
	db *gorm.DB
}

func NewTagPostgresRepository(db *gorm.DB) TagRepository {
	return &tagPostgresRepository{db: db}
}

func (t *tagPostgresRepository) Save(tag entities.Tag) error {
	result := t.db.Create(&tag)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
