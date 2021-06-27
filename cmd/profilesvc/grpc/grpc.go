package grpc

import (
	"context"
	"errors"
	"log"
	"net"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/grpc"

	profiles "github.com/whattheearl/fig/cmd/profilesvc/mongodb"
	pb "github.com/whattheearl/fig/pkg/profilepb"
)

type server struct {
	pb.UnimplementedProfileServiceServer
}

func Run(addr string) {
	log.Printf("Listening on:: %s", addr)
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
	if in == nil {
		return nil, errors.New("bad request, id required")
	}

	log.Printf("[GetById] id: %s", in.Id)

	p, err := profiles.GetById(in.Id)

	if err != nil {
		log.Println(err)
		return nil, errors.New("could not retrieve profile")
	}

	r := GetProfileResponseFromProfile(p)
	log.Printf("GetById result: %s", r)
	return r, nil
}

func (s *server) GetByEmail(ctx context.Context, in *pb.EmailRequest) (*pb.ProfileResponse, error) {
	log.Printf("GetByEmail: %s", in)
	p, err := profiles.GetByEmail(in.Email)

	if err != nil {
		log.Println(err)
		return nil, errors.New("could not retrieve profile")
	}

	r := GetProfileResponseFromProfile(p)
	log.Printf("GetByEmail result: %s", r)
	return r, nil
}

func (s *server) GetByUsername(ctx context.Context, in *pb.UsernameRequest) (*pb.ProfileResponse, error) {
	log.Printf("GetByUsername: %s", in)
	p, err := profiles.GetByUsername(in.Username)

	if err != nil {
		log.Println(err)
		return nil, errors.New("could not retrieve profile")
	}

	r := GetProfileResponseFromProfile(p)
	log.Printf("GetByUsername result: %s", r)
	return r, err
}

func (s *server) Create(ctx context.Context, in *pb.CreateRequest) (*pb.ProfileResponse, error) {
	p := &profiles.Profile{
		ID:        primitive.NewObjectID(),
		Email:     in.Email,
		Name:      in.Name,
		Username:  in.Username,
		Summary:   "",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := profiles.Create(p)

	if err != nil {
		log.Printf("failed to create profile: %s err: %s", p, err)
		return nil, err
	}

	r := GetProfileResponseFromProfile(p)

	return r, nil
}

func (s *server) RemoveById(ctx context.Context, in *pb.IdRequest) (*pb.Empty, error) {
	err := profiles.Remove(in.Id)
	return nil, err
}

func (s *server) UpdateById(ctx context.Context, in *pb.UpdateRequest) (*pb.ProfileResponse, error) {
	p, err := profiles.GetById(in.Id)

	if err != nil {
		log.Printf("failed to retrieve profile: %s err: %s", in, err)
		return nil, err
	}

	p.Email = in.Email
	p.Name = in.Name
	p.Username = in.Username
	p.UpdatedAt = time.Now()

	err = profiles.Update(p)

	if err != nil {
		log.Println("failed to update profile: $s", err)
		return nil, err
	}

	r := GetProfileResponseFromProfile(p)
	return r, err
}

func GetProfileResponseFromProfile(p *profiles.Profile) *pb.ProfileResponse {
	result := pb.ProfileResponse{
		Id:       p.ID.String(),
		Email:    p.Email,
		Name:     p.Name,
		Username: p.Username,
		Summary:  p.Summary,
	}
	return &result
}
