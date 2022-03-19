package services

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go-server/models"
	"net/http"
	"os"
	"time"
)

func RegisterUser(c *gin.Context) {
	var input models.UserRegisterData

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userCheck models.User

	if err := models.DB.Where("email=?", input.Email).First(&userCheck).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Account has already been registered"})
		return
	}

	user := models.User{Email: input.Email, Password: input.Password, FirstName: input.FirstName, LastName: input.LastName}
	models.DB.Create(&user)

	tokens := models.Token{Access: CreateToken(user), Refresh: CreateTokenRefresh(user)}

	models.DB.Create(&tokens)

	c.JSON(http.StatusOK, gin.H{"tokens": tokens})
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

	tokens := models.Token{Access: CreateToken(user), Refresh: CreateTokenRefresh(user)}

	models.DB.Create(&tokens)

	c.JSON(http.StatusOK, gin.H{"tokens": tokens})
}

func CreateToken(user models.User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid": user.ID,
		"email":  user.Email,
		"exp":    time.Now().Add(time.Minute * 5).Unix(),
	})

	jwtToken, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	return jwtToken
}

func CreateTokenRefresh(user models.User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"exp":   time.Now().Add(time.Hour * 7200).Unix(),
	})

	jwtToken, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	return jwtToken
}

// DecodeToken W.I.P.
func DecodeToken() {
	type MyCustomClaims struct {
		ID    uint   `json:"userid"`
		Email string `json:"email"`
		jwt.StandardClaims
	}

	tokenString := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InpvbG90YXIzMzNAZ21haWwuY29tIiwiZXhwIjoxNjQ3NjgzMjIxLCJ1c2VyaWQiOjJ9.PeIGk7amOAc2MLK1erp05nA1Wy3q99SKe1w0egrpIc8"
	token, err := jwt.ParseWithClaims(tokenString, &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if claims, ok := token.Claims.(*MyCustomClaims); ok && token.Valid {
		fmt.Printf("%v %v", claims.ID, claims.StandardClaims.ExpiresAt)
	} else {
		fmt.Println(err)
	}
}
