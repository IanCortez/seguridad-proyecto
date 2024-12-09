package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func AccessKeysDatabase() *gorm.DB {
	fmt.Println("connection to keys database")
	dsn := "host=localhost user=postgres password=admin dbname=Aurora port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil
	}
	return db
}

func AccessUserDatabase() *gorm.DB {
	fmt.Println("connection to users database")
	dsn := "host=localhost user=postgres password=admin dbname=Aurora port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil
	}
	return db
}
