package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Page contains meta of different pages
type Page struct {
	ID    primitive.ObjectID `json:"id" bson:"_id"`
	Email string             `json:"email" bson:"email"`
	Route string             `json:"route" bson:"route"`
	Title string             `json:"title" bson:"title"`
}
