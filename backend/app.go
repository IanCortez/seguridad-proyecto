package main

import (
	"fmt"
	"net/http"

	"github.com/aurora/backend/api"
	"github.com/aurora/backend/data/migrations"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	server := mux.NewRouter()

	api.SetUserRouter(server)
	api.SetKeysRouter(server)

	migrations.MakeUserMigrations()
	migrations.MakeKeysMigration()

	corsOption := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),           // Orígenes permitidos
		handlers.AllowedMethods([]string{"GET", "POST"}), // Métodos HTTP permitidos
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
	)

	fmt.Println("Iniciado servidor")
	err := http.ListenAndServe(":8080", corsOption(server))
	if err != nil {
		fmt.Printf("error al inicar el servidor %v", err)
	}
}
