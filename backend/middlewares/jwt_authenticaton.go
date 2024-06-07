package middlewares

import (
	"os"

	"github.com/Yoboba/BWA/pkg/common"
	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func JwtAuthentication() fiber.Handler {
	godotenv.Load()
	return jwtware.New(jwtware.Config{
		SigningKey:   jwtware.SigningKey{Key: []byte(os.Getenv("JWT_SECRET"))},
		ErrorHandler: jwtError,
	})
}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "missing or malformed jwt" {
		return common.Response(c, nil, "missing or malformed jwt", fiber.StatusBadRequest, err.Error())
	}
	return common.Response(c, nil, "invalid or expired jwt", fiber.StatusUnauthorized, err.Error())
}
