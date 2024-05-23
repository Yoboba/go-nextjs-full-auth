package middlewares

import (
	"github.com/Yoboba/GNA/configs"
	"github.com/Yoboba/GNA/database"
	"github.com/Yoboba/GNA/pkg/common"
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
