package entities

import "github.com/Yoboba/GNA/tag/entities"

type Blog_Tag struct {
	BlogID uint
	Blog   Blog `gorm:"foreignKey:BlogID"`
	TagID  uint
	Tag    entities.Tag `gorm:"foreignKey:TagID"`
}
