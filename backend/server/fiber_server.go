package server

import (
	"fmt"

	"github.com/Yoboba/GNA/configs"
	"github.com/Yoboba/GNA/middlewares"
	authHandlers "github.com/Yoboba/GNA/pkg/auth/handlers"
	authRepositories "github.com/Yoboba/GNA/pkg/auth/repositories"
	authUseCases "github.com/Yoboba/GNA/pkg/auth/usecases"
	tagHandlers "github.com/Yoboba/GNA/pkg/tag/handlers"
	tagRepositories "github.com/Yoboba/GNA/pkg/tag/repositories"
	tagUseCases "github.com/Yoboba/GNA/pkg/tag/usecases"
	userHandlers "github.com/Yoboba/GNA/pkg/user/handlers"
	userRepositories "github.com/Yoboba/GNA/pkg/user/repositories"
	userUseCases "github.com/Yoboba/GNA/pkg/user/usecases"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

type fiberServer struct {
	App *fiber.App
	Db  *gorm.DB
	Cfg *configs.Config
}

func (f *fiberServer) Start() {
	f.App.Use(cors.New(cors.ConfigDefault))
	f.InitAuthHttpHandlers()
	f.InitTagHttpHandlers()
	f.App.Use(middlewares.JwtAuthentication())
	f.InitUserHttpHandlers()
	// Moderator Authorization still hasn't used
	serverURL := fmt.Sprintf(":%d", f.Cfg.App.Port)
	f.App.Listen(serverURL)
}

// InitAuthHttpHandlers implements Server.
func (f *fiberServer) InitAuthHttpHandlers() {
	authRepository := authRepositories.NewAuthPostgresRepository(f.Db)

	authUseCase := authUseCases.NewAuthUseCaseImpl(authRepository)

	authHttpHandler := authHandlers.NewAuthHttpHandler(authUseCase)

	v1 := f.App.Group("/v1/auth")
	v1.Post("/sign-up", authHttpHandler.SignUp)
	v1.Post("/sign-in", authHttpHandler.SignIn)
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
	v1.Get("", userHttpHandler.GetUserFromJwt)
}

func NewFiberServer(db *gorm.DB, cfg *configs.Config) Server {
	return &fiberServer{
		App: fiber.New(),
		Db:  db,
		Cfg: cfg,
	}
}
