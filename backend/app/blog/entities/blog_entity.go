package entities

import (
	"github.com/Yoboba/GNA/app/user/entities"
	"gorm.io/gorm"
)

type Blog struct {
	gorm.Model
	Title   string        `gorm:"not null" json:"title"`
	Caption string        `json:"caption"`
	Body    string        `gorm:"not null" json:"body"`
	UserID  uint          `gorm:"not null" json:"user_id"`
	User    entities.User `gorm:"foreignKey:UserID"`
}
