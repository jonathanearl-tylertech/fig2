package main

import (
	"context"
	"log"
	"time"

	pb "github.com/whattheearl/fig/profile-service/pkg/protobuff"
	"google.golang.org/grpc"
)

const (
	profileurl = "0.0.0.0:50051"
)

func main() {

	// http.HandleFunc("/profile", get)
	// http.HandleFunc("/profile", post)

	// Set up a connection to the server.
	conn, err := grpc.Dial(profileurl, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewProfileServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := client.Get(ctx, &pb.ProfileRequest{Id: 1})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}

	log.Printf("Greeting: %s", r.FirstName)
}
