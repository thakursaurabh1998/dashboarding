package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/thakursaurabh1998/dashboarding/server/utils"
)

type (
	authTokenResponse struct {
		AccessToken string `json:"access_token"`
		IDToken     string `json:"id_token"`
	}
)

func fetchAuthDetails(code string) (*authTokenResponse, error) {
	clientID := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")
	apiURI := os.Getenv("API_URI")
	grantType := "authorization_code"
	tokenURL := "https://www.googleapis.com/oauth2/v4/token"

	reqBody := map[string]string{
		"code":          code,
		"client_id":     clientID,
		"client_secret": clientSecret,
		"grant_type":    grantType,
		"redirect_uri":  fmt.Sprintf("%s/auth/callback", apiURI),
	}

	jsonValue, _ := json.Marshal(reqBody)
	resp, err := http.Post(tokenURL, "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	bodyString := string(bodyBytes)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode == http.StatusOK {
		var response authTokenResponse
		json.Unmarshal([]byte(bodyString), &response)
		return &response, nil
	}
	return nil, fmt.Errorf("Bad Request on google auth API")
}

// OAuthCallback returns a users name from the id provided in query param
func (h *Handler) OAuthCallback(c echo.Context) error {
	uiURI := os.Getenv("UI_URI")
	code := c.QueryParam("code")
	response, err := fetchAuthDetails(code)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusBadRequest, createRes(false, nil, nil, http.StatusText(http.StatusBadRequest)))
	}
	dt, err := h.decodeToken(response.IDToken)
	if err != nil {
		panic(err)
	}

	userData := map[string]string{
		"at":      response.AccessToken,
		"name":    (*dt)["name"].(string),
		"email":   (*dt)["email"].(string),
		"picture": (*dt)["picture"].(string),
	}
	_, err = h.userStore.UpsertUser(userData)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, createRes(false, nil, nil, http.StatusText(http.StatusInternalServerError)))
	}
	// create jwt token for the app here and then send it
	jwtToken, err := h.createToken(userData)
	if err != nil {
		utils.Logger.Error(err)
		return c.JSON(http.StatusInternalServerError, createRes(false, nil, nil, http.StatusText(http.StatusInternalServerError)))
	}
	return c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf("%s/callback?Authorization=%s", uiURI, jwtToken))
}
