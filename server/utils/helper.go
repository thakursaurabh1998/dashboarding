package utils

import (
	"fmt"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

// GetUserDataFromContext extracts user data from context
func GetUserDataFromContext(c *echo.Context) (*jwt.MapClaims) {
	user := (*c).Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	fmt.Println(claims)
	return &claims
}
