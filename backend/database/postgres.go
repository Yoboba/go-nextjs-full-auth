package database

import (
	"database/sql"
	"fmt"

	"github.com/Yoboba/GNA/config"
)

type PostgresDatabase struct {
	Db *sql.DB
}

func NewPostgresDatabase(cfg *config.Config) Database {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.Db.Host,
		cfg.Db.Port,
		cfg.Db.User,
		cfg.Db.Password,
		cfg.Db.DBname,
		cfg.Db.SSLMode,
	)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Connect to postgres with port : %d", cfg.Db.Port)
	return &PostgresDatabase{Db: db}
}

func (p *PostgresDatabase) GetDB() *sql.DB {
	return p.Db
}
