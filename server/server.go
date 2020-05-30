package server

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/thakursaurabh1998/dashboarding/server/connections"
	"github.com/thakursaurabh1998/dashboarding/server/router"
)

// Server is a http server instance
type (
	Server struct {
		port string
		e    *echo.Echo
		c    *connections.Connections
	}
)

// Init initializes a server
func Init(port string) (s *Server) {
	e := echo.New()
	c := connections.Connect()

	s = &Server{
		c:    c,
		e:    e,
		port: port,
	}

	e.Use(middleware.AddTrailingSlash())

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${uri} ${method} ${status} ${latency_human}\n",
	}))

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	router.Init(e, c)

	return
}

// Start runs the server on the specified port
func (s *Server) Start() {
	if err := s.e.Start(fmt.Sprintf(":%s", s.port)); err != nil {
		s.e.Logger.Info("Shutting Down the server!")
	}
}

func (s *Server) Run() {
	s.e.Logger.Fatal(s.e.Start(fmt.Sprintf(":%s", s.port)))
}
