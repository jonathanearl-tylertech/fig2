package main

import (
	"context"
	"log"
	"time"

	"github.com/joho/godotenv"
	pb "github.com/whattheearl/fig/profile-service/pkg/protobuff"
	"google.golang.org/grpc"
)

const (
	address = "0.0.0.0:50051"
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	// http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
	// 	fmt.Fprintln(w, req.URL, req.Host, req.URL.Scheme)
	// })

	// http.HandleFunc("/profile", get)
	// http.HandleFunc("/profile", post)

	// server := os.ExpandEnv("${HOST}:${PORT}")
	// fmt.Println("Serving on ", server)
	// log.Fatal(http.ListenAndServe(server, nil))

	// Set up a connection to the server.
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

	c := pb.NewProfileServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.Get(ctx, &pb.ProfileRequest{Id: 1})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}

	log.Printf("Greeting: %s", r.FirstName)
}
