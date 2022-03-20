package services

import (
	"go-server/models"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
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

	tokens := models.Token{ID: user.ID, Access: CreateToken(user), Refresh: CreateTokenRefresh()}

	models.DB.Create(&tokens)

	c.SetCookie("refresh_token", tokens.Refresh, 60*60*24*30, "/", "localhost", false, true) // if https: secure = true
	c.JSON(http.StatusOK, gin.H{"tokens": tokens.Access})
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

	token := models.Token{}
	tokens := models.Token{ID: user.ID, Access: CreateToken(user), Refresh: CreateTokenRefresh()}

	if err := models.DB.Where("id=?", user.ID).First(&token).Error; err != nil {
		models.DB.Create(&tokens)
		c.SetCookie("refresh_token", tokens.Refresh, 60*60*24*30, "/", "localhost", false, true) // if https: secure = true
		c.JSON(http.StatusOK, gin.H{"access": tokens.Access})
		return
	}

	models.DB.Model(&token).Updates(tokens)
	c.SetCookie("refresh_token", tokens.Refresh, 60*60*24*30, "/", "localhost", false, true) // if https: secure = true
	c.JSON(http.StatusOK, gin.H{"access": tokens.Access})
}

func Logout(c *gin.Context) {

	token := models.Token{}

	refreshToken, err := c.Cookie("refresh_token")

	if err != nil {
		return
	}

	if err := models.DB.Where("refresh=?", refreshToken).First(&token).Error; err == nil {
		models.DB.Delete(&token)
	}

	c.SetCookie("refresh_token", "", -1, "/", "", false, true)
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

func CreateTokenRefresh() string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(time.Hour * 7200).Unix(),
	})

	jwtToken, _ := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	return jwtToken
}

func CheckToken(token string) bool {
	type MyCustomClaims struct {
		ID    uint   `json:"userid"`
		Email string `json:"email"`
		jwt.StandardClaims
	}

	tokenParse, _ := jwt.ParseWithClaims(token, &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if _, ok := tokenParse.Claims.(*MyCustomClaims); ok && tokenParse.Valid {
		return true
	}
	return false
}

func Refresh(c *gin.Context) {
	tokenRefresh, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "refresh token not found"})
		return
	}

	token := models.Token{}

	if err := models.DB.Where("refresh=?", tokenRefresh).First(&token).Error; err == nil && CheckToken(tokenRefresh) {
		user := models.User{}

		models.DB.Where("id=?", token.ID).First(&user)

		newToken := CreateToken(user)
		//хардкод - наше всё!
		newTokenStruct := models.Token{Access: newToken}

		models.DB.Model(&token).Updates(newTokenStruct)
		c.JSON(http.StatusOK, gin.H{"access": newToken})
		return
	} else if !CheckToken(tokenRefresh) {
		models.DB.Delete(&token)
	}

	c.JSON(http.StatusConflict, gin.H{"error": "refresh token invalid"})
}
