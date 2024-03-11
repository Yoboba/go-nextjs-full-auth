package main

import (
	"github.com/Yoboba/GNA/config"
	"github.com/Yoboba/GNA/database"
	"github.com/Yoboba/GNA/server"
	_ "github.com/lib/pq"
)

func main() {
	cfg := config.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	server.NewFiberServer(db.GetDB(), &cfg).Start()
}
