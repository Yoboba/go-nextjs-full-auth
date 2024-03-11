package server

type Server interface {
	Start()
	InitTagHttpHandlers()
}
