package migrations

import (
	"github.com/Yoboba/GNA/pkg/entities"
)

var roles = []entities.Role{
	{
		Name: "user",
	},
	{
		Name: "moderator",
	},
}
var users = []entities.User{
	{
		Username: "Yobubble",
		Email:    "Thanachot.onl@gmail.com",
		Password: "$2a$10$DdB6INzHJegaH6FP3cAoN.gyYWhsf5FteT2lcpNa0pmCr3QtP2LK.",
		RoleID:   1,
	}, // password : yobuza007
	{
		Username: "Prisma",
		Email:    "Nanthapat.wat@gmail.com",
		Password: "$2a$10$PnRt9tWH93bC/95k5510m.fFeARX8XqvDVsVeNOYzDbQ7F/brz3ii",
		RoleID:   2,
	}, // password : guideza007
	{
		Username: "DEVN",
		Email:    "Phoonawit.ler@gmail.com",
		Password: "$2a$10$ojwVltOCkQkbKzxO1UGt8OJhKqhPMvRVIYsVJPg3niqK.b8uM.UA2",
		RoleID:   1,
	}, // password : devnza007
	{
		Username: "Batman8K",
		Email:    "sanhanut.nig@gmail.com",
		Password: "$2a$10$FpwJ7b0p3bwtaE3gpvp/huyjGEPI9bq1/rjJobQvA83R6sawxl1DG",
		RoleID:   1,
	}, // password : batman8kza007
}
var blogs = []entities.Blog{
	{
		Title:   "Building Scalable Microservices with Go",
		Caption: "Discover how the Go programming language is revolutionizing the development of scalable, efficient microservices.",
		Body:    "The Go programming language, often referred to as Golang, has become a popular choice for developing microservices. Its simplicity, performance, and strong support for concurrent programming make it an ideal fit for building scalable and efficient microservices architectures.",
		UserID:  1, // <- Yobubble
		Tags: []entities.Tag{
			{
				Name: "GO",
			},
			{
				Name: "Microservices",
			},
			{
				Name: "Scalable Architecture",
			},
			{
				Name: "Concurrent Programming",
			},
			{
				Name: "RESTful APIs",
			},
		},
	},
	{
		Title:   "Implementing Clean Architecture in Go: Best Practices and Benefits",
		Caption: "Learn how to leverage the principles of clean architecture in Go to build maintainable, scalable, and testable applications.",
		Body:    "Clean architecture is a design philosophy that aims to create systems that are easy to maintain, test, and scale by organizing code into layers with distinct responsibilities. When implemented in Go, clean architecture can help developers build robust applications that stand the test of time and adapt to changing requirements.",
		UserID:  2, // <- Prisma
		Tags: []entities.Tag{
			{
				Name: "GO", // <- Duplicated data
			},
			{
				Name: "Clean Architecture",
			},
			{
				Name: "Software Design",
			},
			{
				Name: "Microservices", // <- Duplicated data
			},
		},
	},
	{
		Title:   "The Evolution of Integrated Development Environments: From Simple Text Editors to AI-Powered IDEs",
		Caption: "Explore the fascinating journey of Integrated Development Environments (IDEs) and how AI-powered features are transforming the way developers write code.",
		Body:    "Integrated Development Environments (IDEs) have come a long way since their inception. What started as simple text editors has evolved into sophisticated platforms that significantly enhance developer productivity. This article explores the history of IDEs, their current state, and the exciting future trends driven by artificial intelligence.",
		UserID:  4, // <- Batman8K
		Tags: []entities.Tag{
			{
				Name: "IDE",
			},
			{
				Name: "Artificial Intelligence",
			},
			{
				Name: "Software Development",
			},
			{
				Name: "GitHub Copilot",
			},
		},
	},
}
