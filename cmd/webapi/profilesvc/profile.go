package profilesvc

import (
	"context"
	"errors"
	"log"
	"time"

	"google.golang.org/grpc"

	pb "github.com/whattheearl/fig/pkg/profilepb"
)

var (
	profileclient pb.ProfileServiceClient
	addr          string
)

func Config(address string) {
	addr = address
}

func Connect() (pb.ProfileServiceClient, error) {
	if profileclient != nil {
		return profileclient, nil
	}
	log.Printf("connecting to profile service")
	log.Printf("- addr: %s", addr)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	conn, err := grpc.DialContext(ctx, addr, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		return nil, err
	}
	profileclient = pb.NewProfileServiceClient(conn)
	return profileclient, err
}

func GetProfileByUsername(un string) (*pb.ProfileResponse, error) {
	log.Printf("profilesvc[GetProfileByUsername] un: %s", un)
	client, err := Connect()
	if err != nil {
		log.Println("profilesvc[GetProfileByUsername] could not connect to profile service. err:", err)
		return nil, errors.New("profilesvc[GetProfileByUsername] could not connect to profile service")
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := client.GetByUsername(ctx, &pb.UsernameRequest{Username: un})
	return r, err
}

func GetById(id string) (*pb.ProfileResponse, error) {
	log.Printf("profilesvc[GetById] id: %s", id)
	client, err := Connect()
	if err != nil {
		log.Println("profilesvc[GetById] could not connect to profile service. err:", err)
		return nil, errors.New("profilesvc[GetById] could not connect to profile service")
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := client.GetById(ctx, &pb.IdRequest{Id: id})
	return r, err
}

func CreateProfile(username string, email string, name string) (*pb.ProfileResponse, error) {
	log.Printf("profilesvc[CreateProfile] username: %s, email: %s, name: %s", username, email, name)
	client, err := Connect()
	if err != nil {
		log.Println("profilesvc[CreateProfile] could not connect to profile service. err:", err)
		return nil, errors.New("profilesvc[CreateProfile] could not connect to profile service")
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := client.Create(ctx, &pb.CreateRequest{Username: username, Email: email, Name: name})
	return r, err
}
