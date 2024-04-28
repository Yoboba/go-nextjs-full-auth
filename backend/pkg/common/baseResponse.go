package common

import "github.com/gofiber/fiber/v2"

type baseResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

func Response(c *fiber.Ctx, data interface{}, message string, status int, err string) error {
	return c.JSON(baseResponse{
		Status:  status,
		Message: message,
		Data:    data,
		Error:   err,
	})
}
