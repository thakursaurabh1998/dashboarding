package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/thakursaurabh1998/dashboarding/server/utils"
)

// GetUser returns a users name from the id provided in query param
func (h *Handler) GetUser(c echo.Context) error {
	userDataMap := utils.GetUserDataFromContext(&c)
	email := (*userDataMap)["email"].(string)

	userData, err := h.userStore.GetUser(email)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusNotFound, createRes(false, nil, nil, http.StatusText(http.StatusNotFound)))
	}
	return c.JSON(http.StatusOK, userData)
}

// InsertUser saves the user to the database
func (h *Handler) InsertUser(c echo.Context) error {
	m := echo.Map{}
	if err := c.Bind(&m); err != nil {
		return err
	}
	name, email, at, picture := m["name"], m["email"], m["at"], m["picture"]
	if name == nil || email == nil {
		return c.JSON(http.StatusBadRequest, createRes(false, nil, []string{"Keys missing in body"}, http.StatusText(http.StatusBadRequest)))
	}
	data, err := h.userStore.InsertUser(name.(string), email.(string), picture.(string), at.(string))
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, createRes(false, nil, []string{"Error while saving user data"}, http.StatusText(http.StatusInternalServerError)))
	}
	return c.JSON(http.StatusOK, createRes(true, data, nil, ""))
}

// UpsertUser updates or isnerts the user to the database
func (h *Handler) UpsertUser(c echo.Context) error {
	m := echo.Map{}
	if err := c.Bind(&m); err != nil {
		return err
	}
	name, email, at, picture := m["name"], m["email"], m["at"], m["picture"]
	if name == nil || email == nil || at == nil || picture == nil {
		return c.JSON(http.StatusBadRequest, createRes(false, nil, []string{"Keys missing in body"}, http.StatusText(http.StatusBadRequest)))
	}
	userData := map[string]string{
		"at":      at.(string),
		"name":    name.(string),
		"email":   email.(string),
		"picture": picture.(string),
	}
	data, err := h.userStore.UpsertUser(userData)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, createRes(false, nil, []string{"Error while updating user data"}, http.StatusText(http.StatusInternalServerError)))
	}
	return c.JSON(http.StatusOK, createRes(true, data, nil, ""))
}
