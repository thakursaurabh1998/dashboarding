package store

import (
	"context"

	"github.com/thakursaurabh1998/dashboarding/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	userStore struct {
		db *mongo.Database
	}
	// UserStore is an interface for user functions
	UserStore interface {
		GetUser(email string) (*models.User, error)
		SaveUser(name string, email string) (*mongo.InsertOneResult, error)
	}
)

// NewUserStore creates an instance for the user store
func NewUserStore(db *mongo.Database) UserStore {
	return &userStore{db}
}

func (us *userStore) GetUser(email string) (*models.User, error) {
	var userData models.User
	filter := bson.D{{"email", email}}
	err := us.db.Collection("users").FindOne(context.TODO(), filter).Decode(&userData)
	if err != nil {
		return nil, err
	}
	return &userData, nil
}

func (us *userStore) SaveUser(name string, email string) (*mongo.InsertOneResult, error) {
	user := models.User{Name: name, Email: email, ForeignID: "hello", ID: primitive.NewObjectID()}
	return us.db.Collection("users").InsertOne(context.TODO(), user)
}
