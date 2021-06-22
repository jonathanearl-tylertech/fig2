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
	mux := http.NewServeMux()

	// setup gql server
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	mux.Handle("/query", srv)
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))

	// run server
	port := os.Getenv("WEBAPI_PORT")
	if port == "" {
		port = ":8080"
	}

	handler := corsconfig().Handler(mux)

	log.Printf("connect %s for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(port, handler))
}

func corsconfig() *cors.Cors {
	clientaddr := os.Getenv("CLIENT_ADDR")
	configuration := os.Getenv("CONFIGURATION")
	return cors.New(cors.Options{
		AllowedOrigins: []string{clientaddr},
		Debug:          configuration == "DEVELOPE",
	})
}
