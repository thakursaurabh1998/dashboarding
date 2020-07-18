package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User is the schema for all user documents
type User struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`
	Name        string             `json:"name" bson:"name"`
	Email       string             `json:"email" bson:"email"`
	AccessToken string             `json:"accessToken" bson:"accessToken"`
	PictureURL  string             `json:"pictureUrl" bson:"pictureUrl"`
}
