package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var DB *gorm.DB

func ConnectionDataBase() {
	// Checking .env file
	godotenv.Load()
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
