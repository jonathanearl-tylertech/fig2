package grpc

import (
	"context"
	"errors"
	"log"
	"net"
	"time"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/grpc"

	db "github.com/whattheearl/fig/profilesvc/internal/mongodb"
	pb "github.com/whattheearl/fig/profilesvc/pb"
)

type server struct {
	pb.UnimplementedProfileServiceServer
}

func GetMockProfile() (*pb.ProfileResponse, error) {
	id := uuid.New().String()
	log.Printf("returning fake user")
	return &pb.ProfileResponse{Name: "Jonathan Earl", Username: "whattheearl", Id: id, Summary: "cool cool cool", Email: "superemail@super.com"}, nil
}

func Run(addr string) {
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	log.Printf("starting server on %v", addr)

	s := grpc.NewServer()
	pb.RegisterProfileServiceServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func (s *server) GetById(ctx context.Context, in *pb.IdRequest) (*pb.ProfileResponse, error) {
	err := errors.New("not implemented")
	return nil, err
}

func (s *server) GetByEmail(ctx context.Context, in *pb.EmailRequest) (*pb.ProfileResponse, error) {
	profile, err := GetMockProfile()
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
		return nil, errors.New("Could not retrieve profile")
	}
	return profile, nil
}

func (s *server) GetByUsername(ctx context.Context, in *pb.UsernameRequest) (*pb.ProfileResponse, error) {
	err := errors.New("not implemented")
	return nil, err
}

func (s *server) Create(ctx context.Context, in *pb.CreateRequest) (*pb.ProfileResponse, error) {
	p := db.Profile{
		ID:        primitive.NewObjectID(),
		Email:     in.Email,
		Name:      in.Name,
		Username:  in.Username,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := db.CreateProfile(p)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
		return nil, errors.New("Could not retrieve profile")
	}

	pr := &pb.ProfileResponse{
		Id:       p.ID.String(),
		Email:    p.Email,
		Name:     p.Name,
		Username: p.Username,
	}
	return pr, nil
}

func (s *server) RemoveById(ctx context.Context, in *pb.IdRequest) (*pb.Empty, error) {
	err := errors.New("not implemented")
	return nil, err
}

func (s *server) UpdateById(ctx context.Context, in *pb.UpdateRequest) (*pb.ProfileResponse, error) {
	err := errors.New("not implemented")
	return nil, err
}
