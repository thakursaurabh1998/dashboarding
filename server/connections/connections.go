package connections

import (
	"context"
	"fmt"
	"log"
	"net/url"
	"os"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Connections contain all the instances of external connections
type Connections struct {
	dbClient *mongo.Client
	Db       *mongo.Database
}

func mongoConnection() (*mongo.Database, *mongo.Client) {
	var mongoURI string
	mongoHost := os.Getenv("MONGO_HOST")
	mongoUser := os.Getenv("MONGO_USER")
	mongoPass := url.QueryEscape(os.Getenv("MONGO_PASSS"))
	mongoDB := os.Getenv("MONGO_DB")
	if mongoURI = os.Getenv("MONGO_URI"); mongoURI == "" {
		mongoURI = fmt.Sprintf("mongodb+srv://%s:%s@%s/%s?retryWrites=true&w=majority", mongoUser, mongoPass, mongoHost, mongoDB)
	}

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}
	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	logrus.Info("Connected to MongoDB!")

	db := client.Database(mongoDB)

	return db, client
}

// Connect returns with a connection object of all connections
func Connect() *Connections {
	db, mongoDBClient := mongoConnection()

	return &Connections{
		Db:       db,
		dbClient: mongoDBClient,
	}
}

func Disconnect(client *Connections) {
	err := client.dbClient.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}

	logrus.Info("Connection to MongoDB closed.")
}
