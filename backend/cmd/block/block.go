package main

import (
	"github.com/Yoboba/BWA/configs"
	"github.com/Yoboba/BWA/database"
	"github.com/Yoboba/BWA/pkg/migrations"
	"github.com/Yoboba/BWA/server"
	_ "github.com/lib/pq"
)

func main() {
	cfg := configs.LoadConfig()

	db := database.NewPostgresDatabase(&cfg)

	migrations.NewPostgresMigration(db).Reset()
	migrations.NewPostgresMigration(db).MockDataMigrate()

	server.NewFiberServer(db.GetDB(), &cfg).Start()
}
