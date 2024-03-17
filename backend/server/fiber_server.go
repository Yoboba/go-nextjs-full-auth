package server

import (
	"fmt"

	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/tag/handlers"
	"github.com/Yoboba/GNA/tag/repositories"
	"github.com/Yoboba/GNA/tag/usecases"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

type fiberServer struct {
	App *fiber.App
	Db  *gorm.DB
	Cfg *config.Config
}

func NewFiberServer(db *gorm.DB, cfg *config.Config) Server {
	return &fiberServer{
		App: fiber.New(),
		Db:  db,
		Cfg: cfg,
	}
}

func (f *fiberServer) Start() {
	f.App.Use(cors.New(cors.ConfigDefault))
	f.InitTagHttpHandlers()
	serverURL := fmt.Sprintf(":%d", f.Cfg.App.Port)
	f.App.Listen(serverURL)
}

// InitTagHttpHandlers implements Server.
func (f *fiberServer) InitTagHttpHandlers() {
	tagRepository := repositories.NewTagPostgresRepository(f.Db)

	tagUseCase := usecases.NewTagUseCaseImpl(tagRepository)

	tagHttpHandler := handlers.NewTagHttpHandler(tagUseCase)

	v1 := f.App.Group("/v1")
	v1.Post("/tag", tagHttpHandler.CreateTag)
	v1.Get("/tags", tagHttpHandler.GetTag)
}
