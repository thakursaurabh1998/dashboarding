package tests

import (
	"testing"

	"github.com/thakursaurabh1998/dashboarding/server/handlers"
)

func TestHello(t *testing.T) {
	want := "Hello world! Dashing soon."
	if got := handlers.Hello(); got != want {
		t.Errorf("hello() = %q, want %q", got, want)
	}
}
