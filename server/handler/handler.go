package handler

type db string

type Handler struct {
	DB db
}

func NewHandler() (h *Handler) {
	h = &Handler{
		DB: "THIS IS MONGODB",
	}

	return
}
