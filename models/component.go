package models

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ComponentMeta contains specific rules and display keys
type ComponentMeta struct {
	Rules   bson.M `json:"rules" bson:"rules"`
	Display bson.M `json:"display" bson:"display"`
}

// Component contains config of different components in a page
type Component struct {
	ID     primitive.ObjectID `json:"id" bson:"_id"`
	PageID primitive.ObjectID `json:"pageID" bson:"pageID"`
	Name   string             `json:"name" bson:"name"`
	Key    string             `json:"key" bson:"key"`
	Label  string             `json:"label" bson:"label"`
	Meta   ComponentMeta      `json:"meta" bson:"meta"`
}
