package entities

import (
	"github.com/Yoboba/GNA/user/entities"
	"gorm.io/gorm"
)

type Blog struct {
	gorm.Model
	Title   string        `json:"title"`
	Caption string        `json:"caption"`
	Body    string        `json:"body"`
	UserID  uint          `json:"user_id"`
	User    entities.User `gorm:"foreignKey:UserID"`
}
