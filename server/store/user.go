package store

import (
	"context"

	"github.com/thakursaurabh1998/dashboarding/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type (
	userStore struct {
		db *mongo.Database
	}
	// UserStore is an interface for user functions
	UserStore interface {
		GetUser(email string) (*models.User, error)
		InsertUser(name string, email string, picture string, at string) (*mongo.InsertOneResult, error)
		UpsertUser(userData map[string]string) (*mongo.UpdateResult, error)
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

func (us *userStore) InsertUser(name string, email string, picture string, at string) (*mongo.InsertOneResult, error) {
	user := models.User{
		Name:        name,
		Email:       email,
		ID:          primitive.NewObjectID(),
		AccessToken: at,
		PictureURL:  picture,
	}
	return us.db.Collection("users").InsertOne(context.TODO(), user)
}

func (us *userStore) UpsertUser(userData map[string]string) (*mongo.UpdateResult, error) {
	at := userData["at"]
	name := userData["name"]
	email := userData["email"]
	picture := userData["picture"]

	filter := bson.D{{"email", email}}
	update := bson.D{
		{"$set", bson.D{
			{"name", name},
			{"picture", picture},
			{"accessToken", at},
		}},
	}
	upsert := true
	opt := &options.UpdateOptions{Upsert: &upsert}
	return us.db.Collection("users").UpdateOne(context.TODO(), filter, update, opt)
}
