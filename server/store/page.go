package store

import (
	"context"

	"github.com/thakursaurabh1998/dashboarding/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type (
	pageStore struct {
		db *mongo.Database
	}
	// PageStore is an interfacce for sotre functions
	PageStore interface {
		GetPage(email string, ids []string) ([]*models.Page, error)
		GetPages(email string) ([]*models.Page, error)
		AddPage(email, route, title string) (*mongo.InsertOneResult, error)
	}
)

// NewPageStore creates an instance for the user store
func NewPageStore(db *mongo.Database) PageStore {
	return &pageStore{db}
}

func (ps *pageStore) AddPage(email, route, title string) (*mongo.InsertOneResult, error) {
	page := models.Page{
		Email:      email,
		Route:      route,
		Title:      title,
		ID:         primitive.NewObjectID(),
		Components: []models.Component{},
	}

	return ps.db.Collection("pages").InsertOne(context.TODO(), page)
}

func (ps *pageStore) GetPage(email string, ids []string) ([]*models.Page, error) {
	pids := []primitive.ObjectID{}
	for _, id := range ids {
		pid, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return nil, err
		}
		pids = append(pids, pid)
	}
	filter := bson.D{{"email", email}, {"_id", bson.D{{"$in", pids}}}}
	cur, err := ps.db.Collection("pages").Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	var pages []*models.Page

	for cur.Next(context.TODO()) {
		var elem models.Page
		err := cur.Decode(&elem)
		if err != nil {
			return nil, err
		}
		pages = append(pages, &elem)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}
	return pages, nil
}

func (ps *pageStore) GetPages(email string) ([]*models.Page, error) {
	var pages []*models.Page
	filter := bson.D{{"email", email}}
	cur, err := ps.db.Collection("pages").Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.TODO()) {
		var elem models.Page
		err := cur.Decode(&elem)
		if err != nil {
			return nil, err
		}
		pages = append(pages, &elem)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}
	return pages, nil
}
