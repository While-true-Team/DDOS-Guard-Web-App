package main

import (
	"github.com/gin-gonic/gin"
	"go-server/controllers"
	"go-server/models"
)

func main() {
	r := gin.Default()

	//r.GET("/", func(c *gin.Context) {
	//	c.JSON(http.StatusOK, gin.H{"data": "hello world!"})
	//})

	// Database connection
	models.ConnectionDataBase()

	r.GET("/books", controllers.FindBooks)
	r.GET("/books/:id", controllers.FindBook)
	r.POST("/login", controllers.LoginUser)
	r.POST("/create", controllers.RegisterUser)
	r.POST("/books", controllers.CreateBook)
	r.PATCH("/books/:id", controllers.UpdateBook)
	r.DELETE("/books/:id", controllers.DeleteBook)

	r.Run()
}
