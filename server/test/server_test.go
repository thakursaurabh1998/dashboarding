package tests

import (
	"fmt"
	"testing"
)

func TestHello(t *testing.T) {
	want := "Hello world! Dashing soon."
	fmt.Print(want)
}
