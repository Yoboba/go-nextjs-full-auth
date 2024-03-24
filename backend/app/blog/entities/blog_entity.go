package entities

import (
	tagEntity "github.com/Yoboba/GNA/app/tag/entities"
	"gorm.io/gorm"
)

type Blog struct {
	gorm.Model
	Title   string          `gorm:"not null" json:"title"`
	Caption string          `json:"caption"`
	Body    string          `gorm:"not null" json:"body"`
	UserID  uint            `gorm:"not null" json:"user_id"`
	Tags    []tagEntity.Tag `gorm:"many2many:blog_tags;"`
}
