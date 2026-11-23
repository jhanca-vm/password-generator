package password

import (
	"encoding/json"
	"errors"
	"net/http"
)

type handler struct {
	service *Service
}

func NewHandler(s *Service) http.Handler {
	return &handler{service: s}
}

func (h *handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var rules Rules

	if err := json.NewDecoder(r.Body).Decode(&rules); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	password, err := h.service.Generate(&rules)

	if errors.Is(err, InvalidLength) {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err != nil {
		http.Error(
			w,
			"Failed to generate password",
			http.StatusInternalServerError,
		)
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write(password)
}
