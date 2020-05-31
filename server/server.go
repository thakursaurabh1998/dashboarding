package server

import (
	"context"
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/thakursaurabh1998/dashboarding/server/connections"
	"github.com/thakursaurabh1998/dashboarding/server/router"
	"github.com/thakursaurabh1998/dashboarding/server/utils"
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
	e.HideBanner = true

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
	utils.Logger.Infof("Starting server on port : %s", s.port)
	if err := s.e.Start(fmt.Sprintf(":%s", s.port)); err != nil {
		utils.Logger.Info("Shutting Down the server!")
	}
}

// Stop stops the server
func (s *Server) Stop(ctx *context.Context) {
	utils.Logger.Info("Shutting Down the server!")
	if err := s.e.Shutdown(*ctx); err != nil {
		utils.Logger.Fatal(err)
	}
	connections.Disconnect(s.c)
}
