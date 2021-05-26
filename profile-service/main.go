package main

import (
	"context"
	"log"
	"net"

	pb "github.com/whattheearl/fig/profile-service/protobuff"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

type server struct {
	pb.UnimplementedProfileServiceServer
}

func (s *server) Get(ctx context.Context, in *pb.ProfileRequest) (*pb.ProfileResponse, error) {
	log.Printf("id: %v", in.Id)
	return &pb.ProfileResponse{FirstName: "Jonathan", LastName: "Earl", Id: 1}, nil
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
