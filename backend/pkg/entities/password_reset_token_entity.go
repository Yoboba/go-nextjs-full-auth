package entities

import "time"

type PasswordResetToken struct {
	Id        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Token     string    `gorm:"not null" json:"token"`
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
	UserID    uint      `gorm:"not null" json:"user_id"`
	User      User      `gorm:"foreignKey:UserID"`
}
