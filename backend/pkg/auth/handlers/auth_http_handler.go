package handlers

import (
	"fmt"
	"time"

	"github.com/Yoboba/BWA/pkg/auth/usecases"
	"github.com/Yoboba/BWA/pkg/common"
	"github.com/Yoboba/BWA/pkg/entities"
	"github.com/gofiber/fiber/v2"
)

type authHttpHandler struct {
	usecase usecases.AuthUseCase
}

// ResetPassword implements AuthHandler.
func (a *authHttpHandler) ResetPassword(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "ResetPassword")
	type Body struct {
		UserId      int    `json:"user_id"`
		Token       string `json:"token"`
		NewPassword string `json:"new_password"`
	}
	var body Body
	parseErr := c.BodyParser(&body)
	if parseErr != nil {
		return common.Response(c, nil, "cannot parse body", fiber.StatusBadRequest, parseErr.Error())
	}
	resetPasswordErr := a.usecase.ResetPassword(body.Token, uint(body.UserId), body.NewPassword)
	if resetPasswordErr != nil {
		return common.Response(c, nil, "reset password password error", fiber.StatusInternalServerError, resetPasswordErr.Error())
	}
	return common.Response(c, nil, "successfully reset password", fiber.StatusOK, "")
}

// CodeCheck implements AuthHandler.
func (a *authHttpHandler) PasswordResetTokenCheck(c *fiber.Ctx) error {
	fmt.Println(c.Path(), "PasswordResetTokenCheck")
	type Body struct {
		Code string `json:"code"`
	}
	var body Body
	parseErr := c.BodyParser(&body)
	if parseErr != nil {
		return common.Response(c, nil, "cannot parse body", fiber.StatusBadRequest, parseErr.Error())
	}
	userId, verifyErr := a.usecase.VerifyToken(body.Code)
	if verifyErr != nil {
		return common.Response(c, nil, "Token incorrect", fiber.StatusBadRequest, verifyErr.Error())
	}
	return common.Response(c, userId, "token matched", fiber.StatusOK, "")
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
	user, getUserErr := a.usecase.GetUserByEmail(body.Email)
	if getUserErr != nil {
		return common.Response(c, nil, "cannot retreive user info from email", fiber.StatusInternalServerError, getUserErr.Error())
	}
	sendEmailErr := a.usecase.SendEmail(user)
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
