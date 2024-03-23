package entities

import (
	"github.com/Yoboba/GNA/app/role/entities"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string        `gorm:"not null" json:"username"`
	Email    string        `gorm:"not null" json:"email"`
	Password string        `gorm:"not null" json:"password"`
	RoleID   uint          `gorm:"not null" json:"role_id"`
	Role     entities.Role `gorm:"foreignKey:RoleID"`
}
