package main

import (
	"context"
	"log"
	"net"

	"github.com/google/uuid"
	pb "github.com/whattheearl/fig/profilesvc/pb"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

type server struct {
	pb.UnimplementedProfileServiceServer
}

func Get() (*pb.ProfileResponse, error) {
	id := uuid.New().String()
	log.Printf("returning fake user")
	return &pb.ProfileResponse{Name: "Jonathan Earl", Username: "whattheearl", Id: id, Summary: "cool cool cool"}, nil
}

func (s *server) GetById(ctx context.Context, in *pb.ProfileIdRequest) (*pb.ProfileResponse, error) {
	log.Printf("looking up user by id %v", in.Id)
	return Get()
}

func (s *server) GetByEmail(ctx context.Context, in *pb.ProfileEmailRequest) (*pb.ProfileResponse, error) {
	return Get()
}

func (s *server) GetByUsername(ctx context.Context, in *pb.ProfileUsernameRequest) (*pb.ProfileResponse, error) {
	return Get()
}

func main() {

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	log.Printf("starting server on %v", port)

	s := grpc.NewServer()
	pb.RegisterProfileServiceServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
