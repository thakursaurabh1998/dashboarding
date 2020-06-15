package router

import (
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/thakursaurabh1998/dashboarding/server/handler"
)

var tokenSecret = []byte(os.Getenv("TOKEN_SECRET"))

// APIInit initializes all the routes under /api
func apiInit(api *echo.Group, h *handler.Handler) {
	// CustomValidator provided by echo can be used here
	isUserLoggedIn := middleware.JWTWithConfig(middleware.JWTConfig{
		SigningMethod: jwt.SigningMethodHS256.Alg(),
		ContextKey:    "user",
		TokenLookup:   "header:" + echo.HeaderAuthorization,
		AuthScheme:    "Bearer",
		Claims:        jwt.MapClaims{},
		SigningKey:    tokenSecret,
	})

	api.Use(isUserLoggedIn)
	api.GET("/user", h.GetUser)
	api.PUT("/user", h.UpsertUser)
	api.POST("/user", h.InsertUser)
}
