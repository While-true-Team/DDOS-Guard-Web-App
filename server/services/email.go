package services

import (
	"crypto/tls"
	"fmt"
	"gopkg.in/gomail.v2"
	"os"
)

func SendEmailUUID(email string, UUID string) {
	m := gomail.NewMessage()

	m.SetHeader("From", "ddos.guard.web.app@gmail.com")

	m.SetHeader("To", email)

	m.SetHeader("Subject", "Подтверждение электронной почты DDoS Guard Web App")

	m.SetBody("text/plain", "http://"+os.Getenv("EMAIL_HTTP")+"/activation/"+UUID)

	d := gomail.NewDialer("smtp.gmail.com", 587, os.Getenv("EMAIL_LOGIN"), os.Getenv("EMAIL_PASSWORD"))

	// This is only needed when SSL/TLS certificate is not valid on server.
	// In production this should be set to false.
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
	}

	return
}
