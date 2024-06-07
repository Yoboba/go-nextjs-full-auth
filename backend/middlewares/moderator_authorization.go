package middlewares

import (
	"github.com/Yoboba/BWA/configs"
	"github.com/Yoboba/BWA/database"
	"github.com/Yoboba/BWA/pkg/common"
	"github.com/gofiber/fiber/v2"
)

func ModeratorAuthorization(c *fiber.Ctx) error {
	cfg := configs.LoadConfig()

	db := database.NewPostgresDatabase(&cfg).GetDB()

	user := JwtExtractUserFromUserId(c, db)
	if user.Role.Name != "moderator" {
		return common.Response(c, nil, "moderator unauthorized", fiber.StatusUnauthorized, "")
	}
	return c.Next()
}
