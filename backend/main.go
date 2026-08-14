package main

import (
	"log"
	"net/http"
)

func main() {
	channels := []Channel{
		{ID: "1", Name: "general", Removable: false},
		{ID: "2", Name: "random", Removable: true},
	}

	mux := http.NewServeMux()

	mux.Handle(
		"/api/v1/channels",
		channelsHandler(channels),
	)

	err := http.ListenAndServe(":5003", mux)
	if err != nil {
		log.Fatal(err)
	}

}
