package store

import "go.mongodb.org/mongo-driver/mongo"

var componentCollection *mongo.Collection

type (
	componentStore struct {
		db *mongo.Database
	}
	// ComponentStore is an interface for store functions

)
