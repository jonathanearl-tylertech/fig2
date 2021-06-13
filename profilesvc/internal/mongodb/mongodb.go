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
	Email     string             `bson:"text"`
	Name      string             `bson:"text"`
	Username  string             `bson:"text"`
	CreatedAt time.Time          `bson:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at"`
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

	log.Println("create profile")
	profile := Profile{
		ID:        primitive.NewObjectID(),
		Email:     "earl.jonathan@gmail.com",
		Name:      "jonathan earl",
		Username:  "whattheearl",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	CreateProfile(profile)
	log.Println("get profile")

	var me *Profile
	me, err = GetByEmail("earl.jonathan@gmail.com")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(me, err)
}

func Disconnect() {
	err := client.Disconnect(ctx)
	if err != nil {
		log.Println(err)
	}
}

func CreateProfile(p Profile) error {
	log.Printf("Creating profile: %s", p)

	// profile, err := GetByEmail(p.Email)

	// if err != nil {
	// 	log.Println(err)
	// }

	// if profile != nil {
	// 	return errors.New("email already in use")
	// }
	var err error
	_, err = collection.InsertOne(ctx, p)
	if err != nil {
		log.Printf("Failed to create: %s error: %s", p, err)
		return err
	}

	return nil
}

func GetByEmail(email string) (*Profile, error) {
	log.Printf("retrieving user by email: %s", email)
	var profile bson.M
	err := collection.FindOne(ctx, bson.M{}).Decode(&profile)
	fmt.Println(profile)

	return nil, err
}
