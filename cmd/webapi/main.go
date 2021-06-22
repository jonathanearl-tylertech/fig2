package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"

	"github.com/whattheearl/fig/cmd/webapi/graph"
	"github.com/whattheearl/fig/cmd/webapi/graph/generated"
)

func main() {

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)
	clientaddr := os.Getenv("CLIENT_ADDR")
	c := cors.New(cors.Options{
		AllowedOrigins: []string{clientaddr},
		Debug:          true,
	})
	handler := c.Handler(srv)
	port := os.Getenv("WEBAPI_PORT")
	if port == "" {
		panic("WEBAPI_PORT is not configured")
	}
	log.Printf("connect :%s for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
