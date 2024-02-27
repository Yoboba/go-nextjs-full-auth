package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

// type Blog struct {
// 	id         int
// 	title      string
// 	caption    string
// 	body       string
// 	user_id    int
// 	created_at time.Time
// }

func testDBConnection(c *fiber.Ctx) error {
	err := db.Ping()
	if err != nil {
		c.Status(500).SendString("Database Connection fail")
	}

	finalStr := fmt.Sprintf("DB connection is working on host: %s port: %d", host, port)
	return c.SendString(finalStr)
}

func getUsers(c *fiber.Ctx) error {
	var users []User
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		c.Status(500).SendString(err.Error())
	}

	for rows.Next() {
		var user User
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.Role)
		if err != nil {
			c.Status(500).SendString(err.Error())
		}
		users = append(users, user)
	}

	return c.JSON(users)
}

func getUser(c *fiber.Ctx) error {
	var user User
	id := c.Params("id")
	row := db.QueryRow(`SELECT * FROM users WHERE id = $1`, id)

	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.Role)
	if err != nil {
		c.Status(500).SendString(err.Error())
	}

	return c.JSON(user)
}

func createUser(c *fiber.Ctx) error {
	user := new(User)
	err := c.BodyParser(user)
	if err != nil {
		c.Status(500).SendString(err.Error())
	}

	var id int
	e := db.QueryRow(`INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id`, user.Username, user.Email, user.Password, user.Role).Scan(&id)
	if e != nil {
		c.Status(500).SendString(e.Error())
	}

	return c.SendString(fmt.Sprintf("new user id : %d", id))
}

func deleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := db.Exec(`DELETE FROM users WHERE id = $1`, id)
	if err != nil {
		c.Status(500).SendString(err.Error())
	}

	finalStr := fmt.Sprintf("Successfully delete id : %s", id)
	return c.SendString(finalStr)
}
