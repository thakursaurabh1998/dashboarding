package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
)

// OAuthCallback returns a users name from the id provided in query param
func (h *Handler) OAuthCallback(c echo.Context) error {
	m := echo.Map{}
	if err := c.Bind(&m); err != nil {
		return err
	}
	clientID := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")
	apiURI := os.Getenv("REDIRECT_URI")
	grantType := "authorization_code"
	code := c.QueryParam("code")
	reqBody := map[string]string{
		"code":          code,
		"client_id":     clientID,
		"client_secret": clientSecret,
		"grant_type":    grantType,
		"redirect_uri":  apiURI,
	}
	tokenURL := "https://www.googleapis.com/oauth2/v4/token"
	jsonValue, _ := json.Marshal(reqBody)
	resp, err := http.Post(tokenURL, "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		fmt.Print(err)
	}
	defer resp.Body.Close()
	// if resp.StatusCode == http.StatusOK {
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Print(err)
	}
	bodyString := string(bodyBytes)
	fmt.Print(bodyString)
	// }
	return c.JSON(http.StatusOK, createRes(true, nil, nil, http.StatusText(http.StatusOK)))
}
