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
	"github.com/whattheearl/fig/cmd/webapi/profilesvc"
)

func main() {
	// configure to profile service
	PROFILE_ADDR := os.Getenv("PROFILE_ADDR")
	profilesvc.Config(PROFILE_ADDR)

	// setup gql server
	mux := http.NewServeMux()
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	mux.Handle("/query", srv)
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))

	// configure cors
	clientaddr := os.Getenv("CLIENT_ADDR")
	configuration := os.Getenv("CONFIGURATION")
	handler := corsconfig(clientaddr, configuration).Handler(mux)

	// run server
	port := os.Getenv("WEBAPI_PORT")
	if port == "" {
		port = ":8080"
	}
	log.Printf("starting webapi server -connect to graphql playground on http://localhost%s", port)
	log.Fatal(http.ListenAndServe(port, handler))
}

func corsconfig(clientaddr string, configuration string) *cors.Cors {
	debugConfig := configuration == "DEVELOPE"
	log.Printf("configure cors")
	log.Printf("- allowed origins: %s", clientaddr)
	log.Printf("- debug: %t", debugConfig)
	return cors.New(cors.Options{
		AllowedOrigins: []string{clientaddr},
		Debug:          debugConfig,
	})
}
