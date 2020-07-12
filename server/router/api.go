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
	// user routes
	api.GET("/user", h.GetUser)
	api.PUT("/user", h.UpsertUser)
	api.POST("/user", h.InsertUser)

	// create page routes
	api.GET("/create/pages", h.GetAllPages)
	api.GET("/create/page", h.GetPage)
	api.PUT("/create/page", h.AddPage)
	api.POST("/create/page", h.EditPage)
	api.DELETE("/create/page", h.RemovePage)

	// create component routes
	api.GET("/create/components", h.GetAllComponents)
}
