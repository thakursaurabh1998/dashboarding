package handler

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var tokenSecret = []byte(os.Getenv("TOKEN_SECRET"))

type userTokenClaims struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Picture string `json:"picture"`
	AT      string `json:"at"`
	jwt.StandardClaims
}

func (h *Handler) decodeToken(jwtString string) (*jwt.MapClaims, error) {
	parser := new(jwt.Parser)
	token, _, err := parser.ParseUnverified(jwtString, jwt.MapClaims{})
	mapClaims := token.Claims.(jwt.MapClaims)
	return &mapClaims, err
}

func (h *Handler) createToken(data map[string]string) (tokenString string, err error) {
	claims := userTokenClaims{
		data["name"],
		data["email"],
		data["picture"],
		data["at"],
		jwt.StandardClaims{
			ExpiresAt: time.Now().Unix() + int64(time.Hour)*24,
			Issuer:    "dashboarding",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err = token.SignedString(tokenSecret)
	return
}
