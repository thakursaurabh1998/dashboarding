package handler

import (
	"github.com/dgrijalva/jwt-go"
)

func (h *Handler) decodeToken(jwtString string) (*jwt.Claims, error) {
	parser := new(jwt.Parser)
	token, _, err := parser.ParseUnverified(jwtString, jwt.MapClaims{})

	return &token.Claims, err
}
