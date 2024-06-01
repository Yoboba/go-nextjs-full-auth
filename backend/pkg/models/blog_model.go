package models

import (
	"time"
)

type Blog struct {
	Id        uint      `gorm:"not null" json:"id"`
	Title     string    `gorm:"not null" json:"title"`
	Caption   string    `json:"caption"`
	Body      string    `gorm:"not null" json:"body"`
	Username  string    `gorm:"not null" json:"username"`
	UpdatedAt time.Time `gorm:"not null" json:"updated_at"`
}

type BlogLike struct {
	Like int `json:"like"`
}

type BlogLikeStatus struct {
	UserId uint `json:"user_id"`
	BlogId uint `json:"blog_id"`
}
