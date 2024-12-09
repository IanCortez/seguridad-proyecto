package migrations

import (
	"fmt"

	"github.com/aurora/backend/data/database"
	"github.com/aurora/backend/data/models"
)

func MakeUserMigrations() {
	fmt.Println("user migrations")
	db := database.AccessUserDatabase()
	db.AutoMigrate(&models.User{})
}
