package handler

import (
	"github.com/dgrijalva/jwt-go"
)

func (h *Handler) decodeToken(jwtString string) (*jwt.MapClaims, error) {
	parser := new(jwt.Parser)
	token, _, err := parser.ParseUnverified(jwtString, jwt.MapClaims{})
	mapClaims := token.Claims.(jwt.MapClaims)
	return &mapClaims, err
}
