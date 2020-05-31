package utils

import "github.com/sirupsen/logrus"

// Logger is instance of logrus to be used for logging across the application
var (
	Logger        *logrus.Logger
	RequestLogger *logrus.Entry
)

// InitLogger gives initializes a logger instance and assigns
// the value to Logger variable available in utils package
func InitLogger() *logrus.Logger {
	Logger = logrus.New()
	return Logger
}
