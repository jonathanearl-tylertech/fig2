package mongodb

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var client *mongo.Client
var collection *mongo.Collection
var ctx = context.TODO()

type Profile struct {
	ID        primitive.ObjectID `bson:"_id"`
	Email     string
	Name      string
	Username  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func Connect(usr string, pwd string, addr string, db string, col string) {
	uri := fmt.Sprintf("mongodb://%s:%s@%s", usr, pwd, addr)
	log.Printf("Connecting to db at: %s", uri)
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	mongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	client = mongoClient
	if err != nil {
		log.Println(err)
		panic(err)
	}
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		log.Println(err)
		panic(err)
	}
	log.Println("Successfully connected and pinged.")
	collection = client.Database(db).Collection(col)

	// todo: create seed
	_, err = GetByEmail("earl.jonthan@gmail.com")
	if err != nil {
		Create(Profile{
			ID:        primitive.NewObjectID(),
			Email:     "earl.jonathan@gmail.com",
			Name:      "jonathan earl",
			Username:  "whattheearl",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		})
	}
}

func Disconnect() {
	err := client.Disconnect(ctx)
	if err != nil {
		log.Println(err)
	}
}

func Create(p Profile) error {
	_, err := collection.InsertOne(ctx, p)
	if err != nil {
		log.Printf("failed to insert profile %s %s", p, err)
		return err
	}

	return nil
}

func Remove(id primitive.ObjectID) error {
	filter := bson.D{{Key: "ID", Value: id}}
	result := collection.FindOneAndDelete(ctx, filter)
	if result.Err() != mongo.ErrNoDocuments {
		log.Println(result.Err())
		return result.Err()
	}
	return nil
}

func UpdateById(p Profile) error {
	filter := bson.D{{Key: "ID", Value: p.ID}}
	result := collection.FindOneAndUpdate(ctx, filter, p)
	if result.Err() != mongo.ErrNoDocuments {
		log.Println(result.Err())
		return result.Err()
	}
	return nil
}

func GetById(id primitive.ObjectID) (Profile, error) {
	var result Profile
	filter := bson.D{{Key: "ID", Value: id}}
	err := collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		log.Println(err)
		return Profile{}, err
	}
	return result, nil
}

func GetByEmail(email string) (Profile, error) {
	var result Profile
	filter := bson.D{{Key: "email", Value: email}}
	err := collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		log.Println(err)
		return Profile{}, err
	}
	return result, nil
}

func GetByUsername(username string) (Profile, error) {
	var result Profile
	filter := bson.D{{Key: "username", Value: username}}
	err := collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		log.Println(err)
		return Profile{}, err
	}
	return result, nil
}
