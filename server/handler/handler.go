package handler

import "github.com/thakursaurabh1998/dashboarding/server/store"

type Handler struct {
	userStore store.UserStore
}

func NewHandler(us store.UserStore) (h *Handler) {
	h = &Handler{
		us,
	}
	return
}
