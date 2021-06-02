package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	pb "github.com/whattheearl/fig/profilesvc/pb"
	"google.golang.org/grpc"
)

const (
	profileurl = "0.0.0.0:50051"
)

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "hi")
}

func main() {
	http.HandleFunc("/", hello)
	http.ListenAndServe(":8080", nil)
	// GetProfile()
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

	id := uuid.New().String()

	r, err := client.GetById(ctx, &pb.ProfileIdRequest{Id: id})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}

	log.Printf("Greeting: %s", r.Name)
}
