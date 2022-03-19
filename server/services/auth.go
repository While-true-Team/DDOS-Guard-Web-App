package services

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go-server/models"
	"net/http"
	"time"
)

func RegisterUser(c *gin.Context) {
	var input models.UserLoginData

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userCheck models.User

	if err := models.DB.Where("email=?", input.Email).First(&userCheck).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Account has already been registered"})
		return
	}

	user := models.User{Email: input.Email, Password: input.Password}
	models.DB.Create(&user)

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func LoginUser(c *gin.Context) {
	var input models.UserLoginData

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User

	if err := models.DB.Where("email=?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found!"})
		return
	}

	if user.Password != input.Password {
		c.JSON(http.StatusForbidden, gin.H{"error": "Incorrect password!"})
		return
	}

	tokens := models.Token{Access: []byte(CreateToken(user)), Refresh: []byte(CreateTokenRefresh(user))}

	models.DB.Create(&tokens)

	c.JSON(http.StatusOK, gin.H{"tokens": tokens})
}

func CreateToken(user models.User) []byte {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid": user.ID,
		"email":  user.Email,
		"exp":    time.Now().Add(time.Minute * 5).Unix(),
	})

	jwtToken, _ := token.SignedString([]byte("secret"))
	return []byte(jwtToken)
}

func CreateTokenRefresh(user models.User) []byte {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid": user.ID,
		"email":  user.Email,
		"exp":    time.Now().Add(time.Hour * 7200).Unix(),
	})

	jwtToken, _ := token.SignedString([]byte("secret"))
	return []byte(jwtToken)
}
