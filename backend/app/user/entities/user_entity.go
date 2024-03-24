package entities

import (
	blogEntity "github.com/Yoboba/GNA/app/blog/entities"
	roleEntity "github.com/Yoboba/GNA/app/role/entities"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string            `gorm:"not null;unique" json:"username"`
	Email    string            `gorm:"not null" json:"email"`
	Password string            `gorm:"not null" json:"password"`
	RoleID   uint              `gorm:"not null" json:"role_id"`
	Role     roleEntity.Role   `gorm:"foreignKey:RoleID"`
	Blogs    []blogEntity.Blog `gorm:"foreignKey:UserID"`
}
