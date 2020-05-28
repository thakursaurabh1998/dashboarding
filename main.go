package main

import (
	"github.com/thakursaurabh1998/dashboarding/server"
)

func main() {
	port := "5000"
	e := server.Init(port)
	e.Run()
}
