package keys

import (
	"encoding/json"
	"net/http"

	"github.com/aurora/backend/data/database"
	"github.com/aurora/backend/data/models"
)

func HandleUploadPublicKey(w http.ResponseWriter, r *http.Request) {
	keys_db := database.AccessKeysDatabase()

	var values models.Public
	err := json.NewDecoder(r.Body).Decode(&values)
	if err != nil {
		http.Error(w, "Error al leer el JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	res := keys_db.Create(&values)

	if res.Error != nil {
		http.Error(w, "No se puede guardar llave privada", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
}
