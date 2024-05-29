package server

type Server interface {
	Start()
	InitTagHttpHandlers()
	InitUserHttpHandlers()
	InitAuthHttpHandlers()
	InitGlobalBlogHttpHandlers()
	InitBlogHttpHandlers()
}
