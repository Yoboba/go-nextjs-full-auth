package models

import (
	"github.com/Yoboba/GNA/pkg/entities"
)

type User struct {
	ID       uint          `json:"id"`
	Username string        `json:"username"`
	Email    string        `json:"email"`
	RoleID   uint          `gorm:"not null" json:"role_id"`
	Role     entities.Role `gorm:"foreignKey:RoleID"`
}
