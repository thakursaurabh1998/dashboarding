package models

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Component contains meta of different components in a page
type Component struct {
	ID     primitive.ObjectID `json:"id" bson:"_id"`
	PageID primitive.ObjectID `json:"pageID" bson:"pageID"`
	Key    string             `json:"key" bson:"key"`
	Label  string             `json:"label" bson:"label"`
	Meta   bson.M             `json:"meta" bson:"meta"`
}
