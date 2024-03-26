package main

import (
	"github.com/Yoboba/GNA/configs"
	"github.com/Yoboba/GNA/database"
	"github.com/Yoboba/GNA/pkg/migrations"
	"github.com/Yoboba/GNA/server"
	_ "github.com/lib/pq"
)

func main() {
	cfg := configs.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	migrations.NewPostgresMigration(db)

	server.NewFiberServer(db.GetDB(), &cfg).Start()
}
