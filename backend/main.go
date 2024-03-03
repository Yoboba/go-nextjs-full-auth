package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "myuser"
	password = "mypassword"
	dbname   = "TEST"
)

var db *sql.DB

func main() {
	// Fiber instacce
	app := fiber.New()

	// Database connection
	db = setupDB()
	defer db.Close()

	// test
	app.Get("/", helloWorld)
	app.Get("/api/v1/testdb", testDBConnection)

	// users
	app.Get("/api/v1/users", getUsers)
	app.Get("/api/v1/user/:id", getUser)
	app.Post("/api/v1/user", createUser)
	app.Delete("/api/v1/user/:id", deleteUser)

	// tags
	app.Get("/api/v1/tags", getTags)
	app.Post("/api/v1/tag", createTag)

	app.Listen(":7070")
}

func helloWorld(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func setupDB() *sql.DB {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

func testDBConnection(c *fiber.Ctx) error {
	err := db.Ping()
	if err != nil {
		c.Status(500).SendString("Database Connection fail")
	}

	finalStr := fmt.Sprintf("DB connection is working on host: %s port: %d", host, port)
	return c.SendString(finalStr)
}
