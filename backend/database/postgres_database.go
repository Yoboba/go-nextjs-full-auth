package database

import (
	"fmt"

	"github.com/Yoboba/GNA/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type postgresDatabase struct {
	Db *gorm.DB
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

	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	fmt.Printf("Connect to postgres with port : %d", cfg.Db.Port)
	return &postgresDatabase{Db: db}
}

func (p *postgresDatabase) GetDB() *gorm.DB {
	return p.Db
}
