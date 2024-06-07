package middlewares

import (
	"github.com/Yoboba/BWA/pkg/entities"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

func JwtExtractUserFromUserId(c *fiber.Ctx, db *gorm.DB) entities.User {
	var user entities.User
	token := c.Locals("user").(*jwt.Token)
	userId := token.Claims.(jwt.MapClaims)["user_id"]

	db.Where("id = ?", userId).First(&user)
	return user
}
