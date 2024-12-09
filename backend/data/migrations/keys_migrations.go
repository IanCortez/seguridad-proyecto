package migrations

import (
	"fmt"

	"github.com/aurora/backend/data/database"
	"github.com/aurora/backend/data/models"
)

func MakeKeysMigration() {
	fmt.Println("keys migration")
	db := database.AccessKeysDatabase()
	db.AutoMigrate(&models.Public{})
}
