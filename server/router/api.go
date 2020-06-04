package router

import (
	"github.com/labstack/echo/v4"

	"github.com/thakursaurabh1998/dashboarding/server/handler"
)

// APIInit initializes all the routes under /api
func APIInit(api *echo.Group, h *handler.Handler) {
	// CustomValidator provided by echo can be used here
	api.GET("/getUser", h.GetUser)
	api.PUT("/saveUser", h.SaveUser)
}
