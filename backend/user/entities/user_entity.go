package entities

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     Role   `json:"role"`
}

type Role string

const (
	GuestRole     Role = "guest"
	UserRole      Role = "user"
	ModeratorRole Role = "moderator"
)
