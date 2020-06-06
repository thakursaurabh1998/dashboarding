package router

import (
	"github.com/labstack/echo/v4"
	"github.com/thakursaurabh1998/dashboarding/server/connections"
	"github.com/thakursaurabh1998/dashboarding/server/handler"
	"github.com/thakursaurabh1998/dashboarding/server/store"
)

func Init(e *echo.Echo, c *connections.Connections) {
	userStore := store.NewUserStore(c.Db)
	h := handler.NewHandler(userStore)
	apiInit(e.Group("/api"), h)
	authInit(e.Group("/auth"), h)
}
