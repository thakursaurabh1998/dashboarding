package server

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/thakursaurabh1998/dashboarding/server/router"
)

type Server struct {
	port string
	e    *echo.Echo
}

func Init(port string) *Server {
	e := echo.New()

	e.Use(middleware.AddTrailingSlash())

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${uri} ${method} ${status} ${latency_human}\n",
	}))

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	router.Init(e)

	return &Server{
		port: port,
		e:    e,
	}
}

func (s *Server) Run() {
	s.e.Logger.Fatal(s.e.Start(fmt.Sprintf(":%s", s.port)))
}
