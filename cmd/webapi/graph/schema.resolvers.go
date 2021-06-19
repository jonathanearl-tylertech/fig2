package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"log"

	"github.com/whattheearl/fig/cmd/webapi/graph/generated"
	"github.com/whattheearl/fig/cmd/webapi/graph/model"
	"github.com/whattheearl/fig/cmd/webapi/profilesvc"
)

func (r *mutationResolver) CreateProfile(ctx context.Context, input model.NewProfile) (*model.Profile, error) {
	p, err := profilesvc.CreateProfile(input.Username, input.Email, input.Name)
	if err != nil {
		log.Println("failed to create profile", p, err)
		return nil, err
	}
	result := model.Profile{Name: p.Name, Username: p.Username, Summary: p.Summary}
	return &result, nil
}

func (r *queryResolver) Profile(ctx context.Context, username string) (*model.Profile, error) {
	p, err := profilesvc.GetProfileByUsername(username)
	if err != nil {
		log.Println("failed to retrieve profile by username", p, err)
		return nil, errors.New("could not retrieve profile")
	}
	result := model.Profile{Name: p.Name, Username: p.Username, Summary: p.Summary}
	return &result, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
