package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"gorm.io/gorm"
)

type tagPostgresRepository struct {
	db *gorm.DB
}

// FindAllFromUserId implements TagRepository.
func (t *tagPostgresRepository) FindAllFromBlogId(id uint) ([]entities.Tag, error) {
	var result []entities.Tag

	t.db.Table("blog_tags").Select("tags.id, tags.name").Joins("left join tags on tags.id = blog_tags.tag_id").Where("blog_tags.blog_id = ?", id).Scan(&result)

	return result, nil
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

func NewTagPostgresRepository(db *gorm.DB) TagRepository {
	return &tagPostgresRepository{db: db}
}
