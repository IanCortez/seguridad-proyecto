package user

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/aurora/backend/data/database"
	"github.com/aurora/backend/data/models"
	"golang.org/x/crypto/bcrypt"
)

func checkUserExists(username string) (bool, models.User) {
	user_db := database.AccessUserDatabase()
	var user models.User
	res := user_db.Where("username = ?", username).Find(&user)
	if res.Error == nil {
		return true, user
	}
	return false, user
}

func HandleRegister(w http.ResponseWriter, r *http.Request) {
	user_db := database.AccessUserDatabase()

	var values models.User
	err := json.NewDecoder(r.Body).Decode(&values)
	if err != nil {
		http.Error(w, "Error al leer el JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	username := values.Username
	password := values.PasswordHash

	userExists, _ := checkUserExists(username)
	if !userExists {
		http.Error(w, "Error al guardar el usuario", http.StatusInternalServerError)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		http.Error(w, "Error al guardar el usuario", http.StatusInternalServerError)
		return
	}

	user := &models.User{
		Username:     username,
		PasswordHash: string(hash),
	}

	res := user_db.Create(&user)
	if res.Error != nil {
		http.Error(w, "Error al generar el usuario", http.StatusInternalServerError)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Created user"))
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	var values models.User
	err := json.NewDecoder(r.Body).Decode(&values)
	if err != nil {
		http.Error(w, "Error al leer el JSON: "+err.Error(), http.StatusBadRequest)
		return
	}
	username := values.Username
	password := values.PasswordHash

	userExists, data := checkUserExists(username)
	if !userExists {
		http.Error(w, "Credenciales incorrectas", http.StatusNotFound)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(data.PasswordHash), []byte(password))
	if err != nil {
		http.Error(w, "Credenciales incorrectas", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	mp := make(map[string]string)
	mp["token"] = strconv.FormatInt(int64(data.ID), 10)
	json.NewEncoder(w).Encode(mp)
}
