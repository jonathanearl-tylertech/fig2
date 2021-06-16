package profile

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"google.golang.org/grpc"

	pb "github.com/whattheearl/fig/profilesvc/pb"
)

func init() {
	err := godotenv.Load("../.env")
	if err != nil {
		panic(err)
	}
}

func GetProfileByUsername(username string) (*pb.ProfileResponse, error) {
	PROFILE_ADDR := os.Getenv("PROFILE_ADDR")
	conn, err := grpc.Dial(PROFILE_ADDR, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Println("failed to connect to profilesvc", PROFILE_ADDR, err)
	}
	defer conn.Close()

	client := pb.NewProfileServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	r, err := client.GetByUsername(ctx, &pb.UsernameRequest{Username: username})
	if err != nil {
		log.Println("could not retrieve user", err)
		return nil, err
	}

	return r, err
}

func CreateProfile(username string, email string, name string) (*pb.ProfileResponse, error) {
	PROFILE_ADDR := os.Getenv("PROFILE_ADDR")
	conn, err := grpc.Dial(PROFILE_ADDR, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Println("failed to connect to profilesvc", PROFILE_ADDR, err)
	}
	defer conn.Close()

	client := pb.NewProfileServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	r, err := client.Create(ctx, &pb.CreateRequest{Username: username, Email: email, Name: name})
	if err != nil {
		log.Println("could not retrieve user", err)
		return nil, err
	}

	return r, err
}
