package server

type Server interface {
	Start()
	InitTagHttpHandlers()
	InitGlobalUserHttpHandlers()
	InitUserHttpHandlers()
	InitAuthHttpHandlers()
	InitGlobalBlogHttpHandlers()
	InitBlogHttpHandlers()
}
