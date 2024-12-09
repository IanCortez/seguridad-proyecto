package api

import (
	"net/http"

	"github.com/aurora/backend/api/handlers/keys"
	"github.com/aurora/backend/api/handlers/user"
	"github.com/gorilla/mux"
)

func SetUserRouter(r *mux.Router) {
	r.HandleFunc("/register", user.HandleRegister).Methods(http.MethodPost)
	r.HandleFunc("/login", user.HandleLogin).Methods(http.MethodPost)
}

func SetKeysRouter(r *mux.Router) {
	r.HandleFunc("/public", keys.HandleUploadPublicKey).Methods(http.MethodPost)
}
