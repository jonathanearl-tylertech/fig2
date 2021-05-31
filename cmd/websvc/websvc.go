package main

import (
	"context"
	"log"
	"time"

	"github.com/google/uuid"
	pb "github.com/whattheearl/fig/internal/profile"
	"google.golang.org/grpc"
)

const (
	profileurl = "0.0.0.0:50051"
)

func main() {

	GetProfile()
}

func GetProfile() {
	conn, err := grpc.Dial(profileurl, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewProfileServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	id, err := uuid.New().MarshalBinary()
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}

	r, err := client.Get(ctx, &pb.ProfileRequest{Id: id})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}

	log.Printf("Greeting: %s", r.Name)
}
