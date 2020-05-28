package router

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func ApiInit(api *echo.Group) {
	api.GET("/", func(c echo.Context) error {
		return c.String(http.StatusInternalServerError, "In api")
	})
}
