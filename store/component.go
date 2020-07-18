package store

import (
	"context"

	"github.com/thakursaurabh1998/dashboarding/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var componentCollection *mongo.Collection

type (
	componentStore struct {
		db *mongo.Database
	}
	// ComponentStore is an interface for store functions
	ComponentStore interface {
		GetAllComponents(pageID string) ([]*models.Component, error)
		AddComponent(pageID, key, label string, meta map[string]interface{}) (*mongo.InsertOneResult, error)
	}
)

// NewComponentStore creates an instance for the user store
func NewComponentStore(db *mongo.Database) ComponentStore {
	componentCollection = db.Collection("components")
	return &componentStore{db}
}

func (cs *componentStore) GetAllComponents(pageID string) ([]*models.Component, error) {
	var components []*models.Component
	pid, err := primitive.ObjectIDFromHex(pageID)
	if err != nil {
		return nil, err
	}
	filter := bson.D{{"pageID", pid}}
	cur, err := componentCollection.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.TODO()) {
		var elem models.Component
		err := cur.Decode(&elem)
		if err != nil {
			return nil, err
		}
		components = append(components, &elem)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}
	return components, nil
}

func (cs *componentStore) AddComponent(pageID, key, label string, meta map[string]interface{}) (*mongo.InsertOneResult, error) {
	pid, err := primitive.ObjectIDFromHex(pageID)
	if err != nil {
		return nil, err
	}
	component := models.Component{
		PageID: pid,
		Key:    key,
		Label:  label,
		Meta:   meta,
		ID:     primitive.NewObjectID(),
	}

	return componentCollection.InsertOne(context.TODO(), component)
}
