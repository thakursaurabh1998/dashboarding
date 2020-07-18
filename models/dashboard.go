package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Dashboard is the schema for storing meta info of a dashboard
type Dashboard struct {
	ID     primitive.ObjectID   `json:"id" bson:"_id"`
	Name   string               `json:"name" bson:"name"`
	Pages  []primitive.ObjectID `json:"pages" bson:"pages"`
	UserID primitive.ObjectID   `json:"userId" bson:"userId"`
}
