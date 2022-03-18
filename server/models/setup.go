package models

import (
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var DB *gorm.DB

func ConnectionDataBase() {
	// Checking .env file
	dsn, exist := os.LookupEnv("POSTGRES_CONNECT")

	if !exist {
		log.Printf("Error loading .env file")
	}

	// Database connection
	// TODO сделать красиво и удобно в будущем
	database, err := gorm.Open("postgres", dsn)

	if err != nil {
		panic(err)
	}

	// Adding schema to database
	database.AutoMigrate(&Book{})

	DB = database
}
