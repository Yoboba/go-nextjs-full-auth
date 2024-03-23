package entities

import (
	blogEntity "github.com/Yoboba/GNA/app/blog/entities"
	tagEntity "github.com/Yoboba/GNA/app/tag/entities"
)

type Blog_Tag struct {
	BlogID uint
	Blog   blogEntity.Blog `gorm:"foreignKey:BlogID"`
	TagID  uint
	Tag    tagEntity.Tag `gorm:"foreignKey:TagID"`
}
