package entities

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model        // <- already has ID as the primary key
	Username   string `gorm:"not null;unique" json:"username"`
	Email      string `gorm:"not null" json:"email"`
	Password   string `gorm:"not null" json:"password"`
	RoleID     uint   `gorm:"not null" json:"role_id"`
	Role       Role   `gorm:"foreignKey:RoleID"`
	Blogs      []Blog `gorm:"many2many:user_blogs_like"`
}
