package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go-server/controllers"
	"go-server/models"
	"go-server/services"
	"time"
)

func main() {
	r := gin.Default()

	//r.GET("/", func(c *gin.Context) {
	//	c.JSON(http.StatusOK, gin.H{"data": "hello world!"})
	//})

	// Database connection
	models.ConnectionDataBase()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://xn--e1ameg9a5c.xn--p1ai", "http://xn--80aaca8d.xn--e1ameg9a5c.xn--p1ai"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
		MaxAge:           1 * time.Minute,
	}))

	r.GET("/books", controllers.FindBooks)
	r.GET("/books/:id", controllers.FindBook)
	r.GET("/activation/:uuid", services.Activation)
	r.POST("/logout", services.Logout)
	r.POST("/login", services.LoginUser)
	r.POST("/register", services.RegisterUser)
	r.POST("/refresh", services.Refresh)
	r.POST("/books", controllers.CreateBook)
	r.PATCH("/books/:id", controllers.UpdateBook)
	r.DELETE("/books/:id", controllers.DeleteBook)

	r.Run()
}
