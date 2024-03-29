package store

import (
	"context"

	"github.com/thakursaurabh1998/dashboarding/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var pageCollection *mongo.Collection

type (
	pageStore struct {
		db *mongo.Database
	}
	// PageStore is an interfacce for store functions
	PageStore interface {
		GetPage(email string, ids []string) ([]*models.Page, error)
		GetAllPages(email string) ([]*models.Page, error)
		AddPage(email, route, title string) (*mongo.InsertOneResult, error)
		EditPage(email, route, newRoute, newTitle string) (*mongo.UpdateResult, error)
		RemovePage(email string, routes []string) (*mongo.DeleteResult, error)
	}
)

// NewPageStore creates an instance for the user store
func NewPageStore(db *mongo.Database) PageStore {
	pageCollection = db.Collection("pages")
	return &pageStore{db}
}

func (ps *pageStore) AddPage(email, route, title string) (*mongo.InsertOneResult, error) {
	page := models.Page{
		Email: email,
		Route: route,
		Title: title,
		ID:    primitive.NewObjectID(),
	}

	return pageCollection.InsertOne(context.TODO(), page)
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
	cur, err := pageCollection.Find(context.TODO(), filter)
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

func (ps *pageStore) GetAllPages(email string) ([]*models.Page, error) {
	var pages []*models.Page
	filter := bson.D{{"email", email}}
	cur, err := pageCollection.Find(context.TODO(), filter)
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

func (ps *pageStore) EditPage(email, route, newRoute, newTitle string) (*mongo.UpdateResult, error) {
	filter := bson.D{{"email", email}, {"route", route}}
	update := bson.D{
		{"$set", bson.D{
			{"route", newRoute},
			{"title", newTitle},
		}},
	}
	return pageCollection.UpdateOne(context.TODO(), filter, update)
}

func (ps *pageStore) RemovePage(email string, routes []string) (*mongo.DeleteResult, error) {
	filter := bson.D{{"email", email}, {"route", bson.D{{"$in", routes}}}}
	data, err := pageCollection.DeleteMany(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	return data, nil
}
