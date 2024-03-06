package main

// TODO: complete api for tag following clean architecture

// import (
// 	"fmt"

// 	"github.com/gofiber/fiber/v2"
// )

// type Tag struct {
// 	Id   int    `json:"id"`
// 	Name string `json:"name"`
// }

// func getTags(c *fiber.Ctx) error {
// 	var tags []Tag
// 	rows, err := db.Query("SELECT * FROM tag")
// 	if err != nil {
// 		c.Status(500).SendString(err.Error())
// 	}

// 	for rows.Next() {
// 		var tag Tag
// 		err := rows.Scan(&tag.Id, &tag.Name)
// 		if err != nil {
// 			c.Status(500).SendString(err.Error())
// 		}
// 		tags = append(tags, tag)
// 	}

// 	return c.JSON(tags)
// }

// func createTag(c *fiber.Ctx) error {
// 	tag := new(Tag)
// 	err := c.BodyParser(tag)
// 	if err != nil {
// 		c.Status(500).SendString(err.Error())
// 	}

// 	var id int
// 	db.QueryRow(`INSERT INTO tag (name) VALUES ($1) RETURNING id`, tag.Name).Scan(&id)
// 	return c.SendString(fmt.Sprintf("New tag : %d", id))
// }

// // TODO: complete api for tags (include optimize code redundancy, )
