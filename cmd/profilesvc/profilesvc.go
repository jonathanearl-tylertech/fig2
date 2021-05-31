package main

import (
	"context"
	"log"
	"net"

	"github.com/google/uuid"
	pb "github.com/whattheearl/fig/internal/profile"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

type server struct {
	pb.UnimplementedProfileServiceServer
}

func (s *server) Get(ctx context.Context, in *pb.ProfileRequest) (*pb.ProfileResponse, error) {
	id, err := uuid.New().MarshalBinary()
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	//
	log.Printf("id: %v", in.Id)
	return &pb.ProfileResponse{Name: "Jonathan Earl", Username: "whattheearl", Id: id, Summary: "cool cool cool"}, nil
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
