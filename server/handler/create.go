package handler

import (
	"net/http"
	"net/url"

	"github.com/labstack/echo/v4"
	"github.com/thakursaurabh1998/dashboarding/server/utils"
)

// GetPages return all the pages of the context user
func (h *Handler) GetPages(c echo.Context) error {
	userDataMap := utils.GetUserDataFromContext(&c)
	email := (*userDataMap)["email"].(string)

	pages, err := h.pageStore.GetPages(email)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusNotFound, createRes(false, nil, nil, http.StatusText(http.StatusNotFound)))
	}
	return c.JSON(http.StatusOK, createRes(true, pages, nil, ""))
}

// GetPage return all the pages of the context user
func (h *Handler) GetPage(c echo.Context) error {
	userDataMap := utils.GetUserDataFromContext(&c)
	m, _ := url.ParseQuery(c.QueryString())
	email := (*userDataMap)["email"].(string)
	ids := m["id"]
	page, err := h.pageStore.GetPage(email, ids)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusNotFound, createRes(false, nil, nil, http.StatusText(http.StatusNotFound)))
	}
	return c.JSON(http.StatusOK, createRes(true, page, nil, ""))
}

// AddPage adds a page to the dashboard
func (h *Handler) AddPage(c echo.Context) error {
	m := echo.Map{}
	if err := c.Bind(&m); err != nil {
		return err
	}
	route, title := m["route"].(string), m["title"].(string)

	userDataMap := utils.GetUserDataFromContext(&c)
	email := (*userDataMap)["email"].(string)

	page, err := h.pageStore.AddPage(email, route, title)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, createRes(false, nil, nil, http.StatusText(http.StatusNotFound)))
	}
	return c.JSON(http.StatusOK, createRes(true, page, nil, ""))
}

// RemovePage by a route
func (h *Handler) RemovePage(c echo.Context) error {
	m := echo.Map{}
	if err := c.Bind(&m); err != nil {
		return err
	}
	rts := m["routes"].([]interface{})
	routes := make([]string, len(rts))
	for i, v := range rts {
		routes[i] = v.(string)
	}
	userDataMap := utils.GetUserDataFromContext(&c)
	email := (*userDataMap)["email"].(string)

	data, err := h.pageStore.RemovePage(email, routes)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, createRes(false, nil, nil, http.StatusText(http.StatusNotFound)))
	}
	return c.JSON(http.StatusOK, createRes(true, data, nil, ""))
}
