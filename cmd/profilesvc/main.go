package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"

	svr "github.com/whattheearl/fig/cmd/profilesvc/grpc"
	db "github.com/whattheearl/fig/cmd/profilesvc/mongodb"
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("could not load .env")
		panic(err)
	}
}

func main() {
	mongo_usr := os.Getenv("MONGO_INITDB_ROOT_USERNAME")
	mongo_pwd := os.Getenv("MONGO_INITDB_ROOT_PASSWORD")
	mongo_addr := os.Getenv("MONGO_ADDR")
	profile_db := os.Getenv("PROFILE_DB")
	profile_collection := os.Getenv("PROFILE_COLLECTION")
	db.Connect(mongo_usr, mongo_pwd, mongo_addr, profile_db, profile_collection)
	db.Drop()
	db.SeedMe()
	p, _ := db.GetByEmail("earl.jonathan@gmail.com")
	fmt.Println(p)
	addr := os.Getenv("PROFILE_ADDR")
	svr.Run(addr)
}
