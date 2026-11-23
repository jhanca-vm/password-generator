package router

import (
	"api/internal/password"
	"embed"
	"io/fs"
	"net/http"
)

type routes struct {
	dist embed.FS
	mux  *http.ServeMux
}

func New(dist embed.FS) *routes {
	return &routes{dist: dist, mux: http.NewServeMux()}
}

func (r *routes) Handler() http.Handler {
	r.registerPassword()
	r.registerStatic()

	return r.mux
}

func (r *routes) registerPassword() {
	generator := password.NewGenerator()
	service := password.NewService(generator)
	handler := password.NewHandler(service)

	r.mux.Handle("POST /api/password/generate", handler)
}

func (r *routes) registerStatic() {
	files, err := fs.Sub(r.dist, "dist")

	if err == nil {
		r.mux.Handle("/", http.FileServerFS(files))
	}
}
