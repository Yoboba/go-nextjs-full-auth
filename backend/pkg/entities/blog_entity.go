package entities

import (
	"gorm.io/gorm"
)

type Blog struct {
	gorm.Model        // <- already has ID as the primary key
	Title      string `gorm:"not null" json:"title"`
	Caption    string `json:"caption"`
	Body       string `gorm:"not null" json:"body"`
	UserID     uint   `gorm:"not null" json:"user_id"`
	User       User   `gorm:"foreignKey:UserID"`
	Tags       []Tag  `gorm:"many2many:blog_tags;"`
	Users      []User `gorm:"many2many:user_blogs_like"`
}
