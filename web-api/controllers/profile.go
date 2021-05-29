package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Profile struct {
	Id       string
	Name     string
	LastName string
}

func Get(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		return
	}
	profile := Profile{"10", "jonathan", "earl"}
	res, err := json.Marshal(profile)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Fprint(w, string(res))
}

func Create(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		return
	}

	fmt.Fprint(w, "Ok")
}

func Remove(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		return
	}

	fmt.Fprint(w, "Ok")
}