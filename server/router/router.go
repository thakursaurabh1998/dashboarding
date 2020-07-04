package router

import (
	"github.com/labstack/echo/v4"
	"github.com/thakursaurabh1998/dashboarding/server/connections"
	"github.com/thakursaurabh1998/dashboarding/server/handler"
	"github.com/thakursaurabh1998/dashboarding/server/store"
)

// Init initializes the router with all the routes
func Init(e *echo.Echo, c *connections.Connections) {
	userStore := store.NewUserStore(c.Db)
	pageStore := store.NewPageStore(c.Db)
	h := handler.NewHandler(userStore, pageStore)
	apiInit(e.Group("/api"), h)
	authInit(e.Group("/auth"), h)
}
