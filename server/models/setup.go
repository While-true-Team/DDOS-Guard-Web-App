package models

import (
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

func ConnectionDataBase() {
	// Checking .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Error loading .env file")
	}

	hostname := os.Getenv("POSTGRES_HOSTNAME")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")

	// Database connection
	// TODO сделать красиво и удобно в будущем
	dsn := "host=" + hostname + " user=" + user + " password=" + password + " dbname=" + dbname + " port=5432 sslmode=disable"
	database, err := gorm.Open("postgres", dsn)

	if err != nil {
		panic(err)
	}

	// Adding schema to database
	database.AutoMigrate(&Book{})

	DB = database
}
