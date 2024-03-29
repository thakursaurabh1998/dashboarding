package handler

import (
	"github.com/thakursaurabh1998/dashboarding/store"
)

// Handler contains all the functions required for the routes
type Handler struct {
	userStore      store.UserStore
	pageStore      store.PageStore
	componentStore store.ComponentStore
}

// NewHandler returns a Handler struct
func NewHandler(us store.UserStore, ps store.PageStore, cs store.ComponentStore) (h *Handler) {
	h = &Handler{
		us,
		ps,
		cs,
	}
	return
}

type response struct {
	Success   bool        `json:"success"`
	Data      interface{} `json:"data,omitempty"`
	Errors    []string    `json:"errors,omitempty"`
	ErrorType string      `json:"errorType,omitempty"`
}

func createRes(success bool, data interface{}, errors []string, errorType string) *response {
	return &response{
		Success:   success,
		Data:      data,
		Errors:    errors,
		ErrorType: errorType,
	}
}
