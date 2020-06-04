package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/thakursaurabh1998/dashboarding/server/utils"
)

type (
	// User handlers
	User interface {
		GetName(echo.Context) error
	}
)

// GetUser returns a users name from the id provided in query param
func (h *Handler) GetUser(c echo.Context) error {
	email := c.QueryParam("email")
	if email == "" {
		return c.String(http.StatusBadRequest, "email missing in qpm")
	}
	userData, err := h.userStore.GetUser(email)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, echo.Map{"success": false})
	}
	return c.JSON(http.StatusOK, userData)
}

// SaveUser saves the user to the database
func (h *Handler) SaveUser(c echo.Context) error {
	m := echo.Map{}
	if err := c.Bind(&m); err != nil {
		return err
	}
	name, email := m["name"].(string), m["email"].(string)
	if name == "" || email == "" {
		return c.String(http.StatusBadRequest, http.StatusText(http.StatusBadRequest))
	}
	data, err := h.userStore.SaveUser(name, email)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, echo.Map{"success": false})
	}
	return c.JSON(http.StatusOK, data)
}
