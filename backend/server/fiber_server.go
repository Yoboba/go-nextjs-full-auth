package server

import (
	"fmt"

	"github.com/Yoboba/BWA/configs"
	"github.com/Yoboba/BWA/middlewares"
	authHandlers "github.com/Yoboba/BWA/pkg/auth/handlers"
	authRepositories "github.com/Yoboba/BWA/pkg/auth/repositories"
	authUseCases "github.com/Yoboba/BWA/pkg/auth/usecases"
	blogHandlers "github.com/Yoboba/BWA/pkg/blog/handlers"
	blogRepositories "github.com/Yoboba/BWA/pkg/blog/repositories"
	blogUseCases "github.com/Yoboba/BWA/pkg/blog/usecases"
	tagHandlers "github.com/Yoboba/BWA/pkg/tag/handlers"
	tagRepositories "github.com/Yoboba/BWA/pkg/tag/repositories"
	tagUseCases "github.com/Yoboba/BWA/pkg/tag/usecases"
	userHandlers "github.com/Yoboba/BWA/pkg/user/handlers"
	userRepositories "github.com/Yoboba/BWA/pkg/user/repositories"
	userUseCases "github.com/Yoboba/BWA/pkg/user/usecases"
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
	f.InitGlobalBlogHttpHandlers()
	f.InitGlobalUserHttpHandlers()
	f.App.Use(middlewares.JwtAuthentication())
	f.InitBlogHttpHandlers()
	f.InitUserHttpHandlers()
	// Moderator Authorization still hasn't been used
	serverURL := fmt.Sprintf(":%d", f.Cfg.App.Port)
	f.App.Listen(serverURL)
}

// InitGlobalUserHttpHandlers implements Server.
func (f *fiberServer) InitGlobalUserHttpHandlers() {
	userRepository := userRepositories.NewUserPostgresRepository(f.Db)
	userUseCase := userUseCases.NewUserUseCaseImpl(userRepository)
	userHttpHandler := userHandlers.NewUserHttpHandler(userUseCase)

	v1 := f.App.Group("/v1/global/users")
	v1.Get("", userHttpHandler.GetUsers)
}

// InitGlobalBlogHttpHandlers implements Server.
func (f *fiberServer) InitGlobalBlogHttpHandlers() {
	blogRepository := blogRepositories.NewBlogPostgresRepository(*f.Db)
	blogUseCase := blogUseCases.NewBlogUseCaseImpl(blogRepository)
	blogHttpHandler := blogHandlers.NewBlogHttpHandler(blogUseCase)

	v1 := f.App.Group("/v1/global/blog")
	v1.Get("", blogHttpHandler.GetBlogs)
	v1.Get("/:blogId", blogHttpHandler.GetBlogById)
	v1.Get("/like/:blogId", blogHttpHandler.GetLikeByBlogId)
}

// InitBlogHttpHandlers implements Server.
func (f *fiberServer) InitBlogHttpHandlers() {
	blogRepository := blogRepositories.NewBlogPostgresRepository(*f.Db)
	blogUseCase := blogUseCases.NewBlogUseCaseImpl(blogRepository)
	blogHttpHandler := blogHandlers.NewBlogHttpHandler(blogUseCase)

	v1 := f.App.Group("/v1/blog")
	v1.Post("", blogHttpHandler.CreateBlog)
	v1.Put("/:blogId", blogHttpHandler.UpdateBlog)
	v1.Delete("/:blogId", blogHttpHandler.DeleteBlog)
	v1.Get("/like", blogHttpHandler.GetBlogsByLike)
	v1.Get("/like/status", blogHttpHandler.GetLikeStatusByUsernameAndBlogId)
	v1.Post("/like/:blogId", blogHttpHandler.CreatelikeByUserIdAndBlogId)
	v1.Delete("/like/:blogId", blogHttpHandler.DeletelikeByUserIdAndBlogId)
}

// InitAuthHttpHandlers implements Server.
func (f *fiberServer) InitAuthHttpHandlers() {
	authRepository := authRepositories.NewAuthPostgresRepository(f.Db)
	authUseCase := authUseCases.NewAuthUseCaseImpl(authRepository)
	authHttpHandler := authHandlers.NewAuthHttpHandler(authUseCase)

	v1 := f.App.Group("/v1/auth")
	v1.Post("/sign-up", authHttpHandler.SignUp)
	v1.Post("/sign-in", authHttpHandler.SignIn)
	v1.Post("/sign-out", authHttpHandler.SignOut)
	v1.Post("/forgot-password", authHttpHandler.ForgotPassword)
	v1.Post("/token-check", authHttpHandler.PasswordResetTokenCheck)
	v1.Post("/reset-password", authHttpHandler.ResetPassword)
}

// InitTagHttpHandlers implements Server.
func (f *fiberServer) InitTagHttpHandlers() {
	tagRepository := tagRepositories.NewTagPostgresRepository(f.Db)
	tagUseCase := tagUseCases.NewTagUseCaseImpl(tagRepository)
	tagHttpHandler := tagHandlers.NewTagHttpHandler(tagUseCase)

	v1 := f.App.Group("/v1/tag")
	v1.Post("", tagHttpHandler.CreateTag)
	v1.Get("", tagHttpHandler.GetTag)
	v1.Get("/:blogId", tagHttpHandler.GetTagFromBlogId)
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
