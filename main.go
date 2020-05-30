package main

import (
	"context"
	"os"
	"os/signal"
	"time"

	"github.com/thakursaurabh1998/dashboarding/server"
)

func main() {
	port := "5000"

	s := server.Init(port)

	go func() {
		s.Start()
	}()

	// Wait for interrupt signal to gracefully shutdown
	// the server with a timeout of 10 seconds.
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	s.Stop(&ctx)
}
