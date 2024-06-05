package handlers

import (
	"fmt"
	"time"

	"github.com/Yoboba/GNA/pkg/auth/usecases"
	"github.com/Yoboba/GNA/pkg/common"
	"github.com/Yoboba/GNA/pkg/entities"
	"github.com/gofiber/fiber/v2"
)

type authHttpHandler struct {
	usecase usecases.AuthUseCase
}

// ForgotPassword implements AuthHandler.
func (a *authHttpHandler) ForgotPassword(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "ForgotPassword")

	type Body struct {
		Email string `json:"email"`
	}

	var body Body
	parseErr := c.BodyParser(&body)
	if parseErr != nil {
		return common.Response(c, nil, "cannot parse body", fiber.StatusBadRequest, parseErr.Error())
	}
	validateEmailErr := a.usecase.ValidateEmail(body.Email)
	if validateEmailErr != nil {
		return common.Response(c, nil, "your email wrong", fiber.StatusBadRequest, validateEmailErr.Error())
	}
	sendEmailErr := a.usecase.SendEmail(body.Email)
	if sendEmailErr != nil {
		return common.Response(c, nil, "cannot send the email", fiber.StatusInternalServerError, sendEmailErr.Error())
	}
	return common.Response(c, nil, "successfully send the email", fiber.StatusOK, "")
}

// SignOut implements AuthHandler.
func (a *authHttpHandler) SignOut(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "SignOut")
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		SameSite: "None",
	})
	c.Cookie(&fiber.Cookie{
		Name:     "username",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		SameSite: "None",
	})
	return common.Response(c, nil, "successfully sign out", fiber.StatusOK, "")
}

// SignIn implements AuthHandler.
func (a *authHttpHandler) SignIn(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "SignIn")
	var signInInfo entities.User
	err := c.BodyParser(&signInInfo)
	if err != nil {
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	token, err := a.usecase.ValidateUser(signInInfo)
	if err != nil {
		return common.Response(c, nil, "validate failed", fiber.StatusUnauthorized, err.Error())
	}

	user, err := a.usecase.GetUserByEmail(signInInfo.Email)
	if err != nil {
		return common.Response(c, nil, "user not found", fiber.StatusNotFound, err.Error())
	}

	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Minute * 5), // 5 minutes
		HTTPOnly: true,
		SameSite: "None",
	})
	c.Cookie(&fiber.Cookie{
		Name:     "username",
		Value:    user.Username,
		Expires:  time.Now().Add(time.Minute * 5), // 5 minutes
		HTTPOnly: true,
		SameSite: "None",
	})

	fmt.Println(c.Path(), "SignIn")
	return common.Response(c, user.Username, "token generated", fiber.StatusOK, "")
}

// SignUp implements AuthHandler.
func (a *authHttpHandler) SignUp(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "SignUp")
	tmp := new(entities.User)
	err := c.BodyParser(tmp)
	if err != nil {
		return common.Response(c, nil, "some information missing", fiber.StatusBadRequest, err.Error())
	}

	err1 := a.usecase.CreateUser(*tmp)
	if err1 != nil {
		return common.Response(c, nil, "cannot register", fiber.StatusInternalServerError, err1.Error())
	}
	fmt.Println(c.Path(), "SignUp")
	return common.Response(c, nil, "user successfully created", fiber.StatusOK, "")
}

func NewAuthHttpHandler(usecase usecases.AuthUseCase) AuthHandler {
	return &authHttpHandler{usecase}
}
