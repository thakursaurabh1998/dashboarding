package models

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Component contains meta of different components in a page
type Component struct {
	Key        string `json:"string" bson:"string"`
	Properties bson.M `json:"properties" bson:"properties"`
}

// Page contains meta of different pages
type Page struct {
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Components []Component        `json:"components" bson:"components"`
	Email      string             `json:"email" bson:"email"`
	Route      string             `json:"route" bson:"route"`
	Title      string             `json:"title" bson:"title"`
}
