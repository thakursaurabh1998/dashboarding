package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/thakursaurabh1998/dashboarding/server/utils"
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
		return c.JSON(http.StatusNotFound, createRes(false, nil, nil, http.StatusText(http.StatusNotFound)))
	}
	return c.JSON(http.StatusOK, userData)
}

// SaveUser saves the user to the database
func (h *Handler) SaveUser(c echo.Context) error {
	m := echo.Map{}
	if err := c.Bind(&m); err != nil {
		return err
	}
	name, email := m["name"], m["email"]
	if name == nil || email == nil {
		return c.JSON(http.StatusBadRequest, createRes(false, nil, []string{"Keys missing in body"}, http.StatusText(http.StatusBadRequest)))
	}
	data, err := h.userStore.SaveUser(name.(string), email.(string))
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, createRes(false, nil, []string{"Error while saving user data"}, http.StatusText(http.StatusInternalServerError)))
	}
	return c.JSON(http.StatusOK, createRes(true, data, nil, ""))
}
