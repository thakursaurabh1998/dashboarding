package handler

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type (
	// User handlers
	User interface {
		GetName(echo.Context) error
	}

	// Name contains first and last name keys
	Name struct {
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
	}
)

// GetName returns a users name from the id provided in query param
func (h *Handler) GetName(c echo.Context) error {
	id := c.QueryParam("id")
	if id == "" {
		return c.String(http.StatusBadRequest, "id missing in qpm")
	}
	name := strings.Split(id, "_")
	return c.JSON(http.StatusOK, &Name{
		strings.Title(strings.ToLower(name[0])),
		strings.Title(strings.ToLower(name[1])),
	})
}
