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

// FindFromId implements BlogRepository.
func (b *blogPostgresRepository) FindFromId(id uint) (models.Blog, error) {
	var blog models.Blog
	result := b.db.Select("blogs.id, blogs.title, blogs.caption, blogs.body, blogs.created_at, users.username").
		Joins("left join users on users.id = blogs.user_id").
		Where("blogs.id = ?", id).First(&blog)
	if result.Error != nil {
		return blog, result.Error
	}
	return blog, nil
}

// FindFromLike implements BlogRepository.
func (b *blogPostgresRepository) FindFromLike(id uint) ([]models.Blog, error) {
	var user entities.User
	var blogs []models.Blog
	result := b.db.Where("id = ?", id).Preload("Blogs").Find(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	for _, blog := range user.Blogs {
		var tmp models.Blog
		tmp.Id = blog.ID
		tmp.Title = blog.Title
		tmp.Caption = blog.Caption
		tmp.Body = blog.Body
		tmp.Username = blog.User.Username
		tmp.CreatedAt = blog.CreatedAt
		blogs = append(blogs, tmp)
	}

	return blogs, nil
}

// DeleteLikeFromBlogIdAndUserId implements BlogRepository.
func (b *blogPostgresRepository) DeleteLikeFromBlogIdAndUserId(userId uint, blogId uint) error {
	var blog entities.Blog
	var user entities.User
	blogResult := b.db.Where("id = ?", blogId).First(&blog)
	if blogResult.Error != nil {
		return blogResult.Error
	}
	userResult := b.db.Where("id = ?", userId).First(&user)
	if userResult.Error != nil {
		return userResult.Error
	}
	err := b.db.Model(&user).Association("Blogs").Delete(blog)
	if err != nil {
		return err
	}
	return nil
}

// SaveLikeFromBlogIdAndUserId implements BlogRepository.
func (b *blogPostgresRepository) SaveLikeFromBlogIdAndUserId(userId uint, blogId uint) error {
	var blog entities.Blog
	var user entities.User
	blogResult := b.db.Where("id = ?", blogId).First(&blog)
	if blogResult.Error != nil {
		return blogResult.Error
	}
	userResult := b.db.Where("id = ?", userId).First(&user)
	if userResult.Error != nil {
		return userResult.Error
	}
	err := b.db.Model(&user).Association("Blogs").Append(&blog)
	if err != nil {
		return err
	}
	return nil
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
	var tags []entities.Tag
	for _, tag := range blog.Tags {
		var existingTag entities.Tag
		result := b.db.Where("name = ?", tag.Name).First(&existingTag)
		if result.Error != nil {
			fmt.Print("some thing weird")
		}
		if result.RowsAffected == 0 {
			fmt.Println("add")
			tags = append(tags, tag)
		} else {
			fmt.Printf("%s already existed", tag.Name)
			tags = append(tags, existingTag)
		}
	}
	blog.Tags = tags
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
