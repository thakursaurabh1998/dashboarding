package router

import (
	"github.com/labstack/echo/v4"
	"github.com/thakursaurabh1998/dashboarding/server/connections"
	"github.com/thakursaurabh1998/dashboarding/server/handler"
)

func Init(e *echo.Echo, c *connections.Connections) {
	h := handler.NewHandler()
	APIInit(e.Group("/api"), h)
}
