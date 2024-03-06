package server

import (
	"fmt"

	"github.com/Yoboba/GNA/config"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Fiber struct {
	App *fiber.App
	Db  *gorm.DB
	Cfg *config.Config
}

func NewFiber(db *gorm.DB, cfg *config.Config) Server {
	return &Fiber{
		App: fiber.New(),
		Db:  db,
		Cfg: cfg,
	}
}

func (f *Fiber) Start() {
	// test
	f.App.Get("/", helloWorld)
	// f.App.Get("/api/v1/testdb", testDBConnection)

	// users
	// f.App.Get("/api/v1/users", getUsers)
	// f.App.Get("/api/v1/user/:id", getUser)
	// f.App.Post("/api/v1/user", createUser)
	// f.App.Delete("/api/v1/user/:id", deleteUser)

	// // tags
	// f.App.Get("/api/v1/tags", getTags)
	// f.App.Post("/api/v1/tag", createTag)

	serverURL := fmt.Sprintf(":%d", f.Cfg.App.Port)
	f.App.Listen(serverURL)
}

func helloWorld(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
