package repositories

import (
	"github.com/Yoboba/BWA/pkg/entities"
	"github.com/Yoboba/BWA/pkg/models"
	"gorm.io/gorm"
)

type tagPostgresRepository struct {
	db *gorm.DB
}

// FindAllFromUserId implements TagRepository.
func (t *tagPostgresRepository) FindAllFromBlogId(id uint) ([]models.Tag, error) {
	var blog entities.Blog
	result := t.db.Where("id = ?", id).Preload("Tags").First(&blog)
	if result.Error != nil {
		return nil, result.Error
	}
	// convert to model
	var tags []models.Tag
	for _, entityTag := range blog.Tags {
		modelTag := models.Tag{
			ID:   entityTag.Id,
			Name: entityTag.Name,
		}
		tags = append(tags, modelTag)
	}
	return tags, nil
}

func (t *tagPostgresRepository) Save(tag entities.Tag) error {
	result := t.db.Create(&tag)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (t *tagPostgresRepository) FindAll() ([]models.Tag, error) {
	var tags []models.Tag
	result := t.db.Model(&entities.Tag{}).Find(&tags)
	if result.Error != nil {
		return nil, result.Error
	}
	return tags, nil
}

func NewTagPostgresRepository(db *gorm.DB) TagRepository {
	return &tagPostgresRepository{db: db}
}
