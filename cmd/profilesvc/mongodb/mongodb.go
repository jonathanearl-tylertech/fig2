package mongodb

import (
	"context"
	"errors"
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
	Summary   string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func Connect(usr string, pwd string, addr string, db string, col string) {
	uri := fmt.Sprintf("mongodb://%s:%s@%s", usr, pwd, addr)
	log.Printf("mongodb[Connect] uri: %s", uri)
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	mongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	client = mongoClient
	if err != nil {
		log.Panic("mongodb[Connect] failed to connect to db")
	}
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		log.Panic("mongodb[Connect] failed to ping db", err)
	}
	log.Println("mongodb[Connect] Successfully connected and pinged.")
	collection = client.Database(db).Collection(col)
}

func Disconnect() error {
	log.Println("mongodb[Disconnect]")
	return client.Disconnect(ctx)
}

func Drop() error {
	log.Println("mongodb[Drop]")
	return collection.Database().Drop(ctx)
}

func SeedMe() error {
	log.Println("mongodb[SeedMe]")
	id, _ := primitive.ObjectIDFromHex("60d7a27a8fd61fb419618812")
	profile := &Profile{
		ID:        id,
		Email:     "earl.jonathan@gmail.com",
		Name:      "jonathan earl",
		Username:  "whattheearl",
		Summary:   "I'm just a small town boy, living in a hello world.",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	log.Println("mongodb[SeedMe] seeding:", profile)
	return Create(profile)
}

func Create(in *Profile) error {
	p, err := GetByUsername(in.Username)
	if err.Error() != "mongo: no documents in result" {
		log.Printf("mongodb[Create] failed to validate username. username: %s, err: %s", in.Username, err)
		return errors.New("failed to validate username")
	}

	if p != nil {
		return errors.New("username already taken")
	}

	_, err = collection.InsertOne(ctx, in)
	if err != nil {
		log.Printf("mongodb[Create] failed to insert profile: %s %s", in.Username, err)
		return errors.New("failed to validate username")
	}

	return nil
}

func Remove(id string) error {
	log.Println("mongodb[Remove] id:", id)
	objectid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("mongodb[Remove]", err)
		return errors.New("bad request, invalid id")
	}

	filter := bson.D{{Key: "ID", Value: objectid}}
	result := collection.FindOneAndDelete(ctx, filter)
	if result.Err() != mongo.ErrNoDocuments {
		log.Println("mongodb[Remove] failed to remove profile:", id)
		return result.Err()
	}
	return nil
}

func Update(p *Profile) error {
	log.Println("mongodb[UpdateById] p:", p)
	filter := bson.D{{Key: "_id", Value: p.ID}}
	result := collection.FindOneAndUpdate(ctx, filter, p)
	if result.Err() != mongo.ErrNoDocuments {
		return result.Err()
	}
	return nil
}

func GetById(id string) (*Profile, error) {
	log.Printf("[GetById] id: %s", id)
	objectid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("[GetById]", err)
		return nil, errors.New("bad request, invalid id")
	}

	log.Println("mongodb[GetById] id:", id)
	var r Profile
	f := bson.D{{Key: "_id", Value: objectid}}
	err = collection.FindOne(ctx, f).Decode(&r)

	if err != nil {
		return nil, err
	}

	log.Println("mongodb[GetById] result:", r)
	return &r, nil
}

func GetByEmail(email string) (*Profile, error) {
	log.Println("mongodb[GetByEmail] id:", email)
	var r Profile
	f := bson.D{{Key: "email", Value: email}}
	err := collection.FindOne(ctx, f).Decode(&r)
	if err != nil {
		return nil, err
	}
	log.Println("mongodb[GetByEmail] r:", r)
	return &r, nil
}

func GetByUsername(username string) (*Profile, error) {
	log.Println("mongodb[GetByUsername] username:", username)
	var r Profile
	filter := bson.D{{Key: "username", Value: username}}
	err := collection.FindOne(ctx, filter).Decode(&r)
	if err != nil {
		return nil, err
	}
	log.Println("mongodb[GetByUsername] r:", r)
	return &r, nil
}
