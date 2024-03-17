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

func (t *tagPostgresRepository) FindAll() ([]entities.Tag, error) {
	var tags []entities.Tag
	result := t.db.Find(&tags)

	if result.Error != nil {
		return nil, result.Error
	}

	return tags, nil
}
