package main

import (
	"api/internal/router"
	"embed"
	"net/http"
)

//go:embed all:dist
var dist embed.FS

func main() {
	routes := router.New(dist)

	http.ListenAndServe(":8000", routes.Handler())
}
