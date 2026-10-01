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

	messages := []Message{
		{
			ID:        "1",
			Username:  "admin",
			Body:      "general",
			ChannelID: "1",
		},
	}

	mux := http.NewServeMux()

	mux.Handle(
		"/api/v1/channels",
		channelsHandler(channels),
	)

	mux.Handle(
		"/api/v1/messages",
		messagesHandler(messages),
	)

	err := http.ListenAndServe(":5003", mux)
	if err != nil {
		log.Fatal(err)
	}

}
