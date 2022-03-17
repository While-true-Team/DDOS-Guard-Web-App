package main

import (
	"github.com/gin-gonic/gin"
	"go-server/models"
)

func main() {
	r := gin.Default()

	//r.GET("/", func(c *gin.Context) {
	//	c.JSON(http.StatusOK, gin.H{"data": "hello world!"})
	//})

	// Database connection
	models.ConnectionDataBase()

	r.Run()
}
