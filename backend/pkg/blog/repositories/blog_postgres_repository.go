package repositories

import (
	"fmt"

	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/Yoboba/GNA/pkg/models"
	"gorm.io/gorm"
)

type blogPostgresRepository struct {
	db gorm.DB
}

// Delete implements BlogRepository.
func (b *blogPostgresRepository) Delete(id uint) error {
	result := b.db.Delete(&entities.Blog{}, id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// Update implements BlogRepository.
func (b *blogPostgresRepository) Update(blog entities.Blog) error {
	result := b.db.Save(blog)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// Save implements BlogRepository.
func (b *blogPostgresRepository) Save(blog entities.Blog) error {
	result := b.db.Create(&blog)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// FindLikeStatusFromUsernameAndBlogId implements BlogRepository.
func (b *blogPostgresRepository) FindLikeStatusFromUsernameAndBlogId(username string, id uint) (bool, error) {
	fmt.Println(username, id)
	result := b.db.Table("user_blogs_like").
		Joins("left join users on users.id = user_blogs_like.user_id").
		Where("users.username = ? AND blog_id = ?", username, id).Scan(&models.BlogLikeStatus{})

	if result.Error != nil {
		return false, result.Error
	}
	if result.RowsAffected == 0 {
		return false, nil
	}
	return true, nil
}

// FindLikeFromBlogId implements BlogRepository.
func (b *blogPostgresRepository) FindLikeFromBlogId(id uint) (models.BlogLike, error) {
	var like models.BlogLike

	result := b.db.Table("user_blogs_like").
		Select("user_blogs_like.blog_id, count(user_blogs_like.blog_id) as like").
		Where("user_blogs_like.blog_id = ?", id).
		Group("user_blogs_like.blog_id").Scan(&like)

	if result.RowsAffected == 0 {
		return like, fmt.Errorf("blog_id %d not exist or do not have any like yet", id)
	}
	if result.Error != nil {
		return like, result.Error
	}
	return like, nil
}

// GetAll implements BlogRepository.
func (b *blogPostgresRepository) FindAll(condition string) ([]models.Blog, error) {
	var blogs []models.Blog
	result := b.db.Model(&entities.Blog{}).
		Select("blogs.id, blogs.title, blogs.caption, blogs.body, blogs.created_at, users.username").
		Joins("left join users on users.id = blogs.user_id").
		Joins("left join blog_tags on blog_tags.blog_id = blogs.id").
		Where(condition).
		Group("blogs.id, users.username").
		Scan(&blogs)
	if result.Error != nil {
		return nil, result.Error
	}
	return blogs, nil
}

func NewBlogPostgresRepository(db gorm.DB) BlogRepository {
	return &blogPostgresRepository{db: db}
}
