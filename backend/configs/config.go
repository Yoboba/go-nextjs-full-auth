package configs

import (
	"github.com/spf13/viper"
)

type (
	Config struct {
		App     App
		Db      Database
		DbAdmin DatabaseAdmin
	}
	App struct {
		Port int
	}
	Database struct {
		Host     string
		Port     int
		User     string
		Password string
		DBname   string
		SSLMode  string
	}
	DatabaseAdmin struct {
		Host string
		Port int
	}
)

func LoadConfig() Config {
	viper.SetConfigName("config")
	viper.AddConfigPath("./")
	viper.SetConfigType("yaml")

	err := viper.ReadInConfig()
	if err != nil {
		panic(err)
	}

	return Config{
		App: App{
			Port: viper.GetInt("app.server.port"),
		},
		Db: Database{
			Host:     viper.GetString("database.host"),
			Port:     viper.GetInt("database.port"),
			User:     viper.GetString("database.user"),
			Password: viper.GetString("database.password"),
			DBname:   viper.GetString("database.dbname"),
			SSLMode:  viper.GetString("database.sslmode"),
		},
		DbAdmin: DatabaseAdmin{
			Host: viper.GetString("database_admin.host"),
			Port: viper.GetInt("database_admin.port"),
		},
	}
}
