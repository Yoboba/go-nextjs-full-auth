package server

import (
	"fmt"

	tagHandlers "github.com/Yoboba/GNA/app/tag/handlers"
	tagRepositories "github.com/Yoboba/GNA/app/tag/repositories"
	tagUseCases "github.com/Yoboba/GNA/app/tag/usecases"
	userHandlers "github.com/Yoboba/GNA/app/user/handlers"
	userRepositories "github.com/Yoboba/GNA/app/user/repositories"
	userUseCases "github.com/Yoboba/GNA/app/user/usecases"
	"github.com/Yoboba/GNA/config"
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
	f.InitUserHttpHandlers()
	f.InitTagHttpHandlers()
	serverURL := fmt.Sprintf(":%d", f.Cfg.App.Port)
	f.App.Listen(serverURL)
}

// InitTagHttpHandlers implements Server.
func (f *fiberServer) InitTagHttpHandlers() {
	tagRepository := tagRepositories.NewTagPostgresRepository(f.Db)

	tagUseCase := tagUseCases.NewTagUseCaseImpl(tagRepository)

	tagHttpHandler := tagHandlers.NewTagHttpHandler(tagUseCase)

	v1 := f.App.Group("/v1/tag")
	v1.Post("", tagHttpHandler.CreateTag)
	v1.Get("", tagHttpHandler.GetTag)
}

// InitUserHttpHandlers implements Server.
func (f *fiberServer) InitUserHttpHandlers() {
	userRepository := userRepositories.NewUserPostgresRepository(f.Db)

	userUseCase := userUseCases.NewUserUseCaseImpl(userRepository)

	userHttpHandler := userHandlers.NewUserHttpHandler(userUseCase)

	v1 := f.App.Group("/v1/user")
	v1.Post("/register", userHttpHandler.Register)
	v1.Post("/login", userHttpHandler.Login)
}
