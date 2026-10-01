package main

import (
	"encoding/json"
	"net/http"
)

type Message struct {
	ID        string `json:"id"`
	Username  string `json:"username"`
	Body      string `json:"body"`
	ChannelID string `json:"channelId"`
}

func messagesHandler(messages []Message) http.Handler {
	return http.HandlerFunc(func(
		w http.ResponseWriter,
		r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(
				w,
				"method not allowed",
				http.StatusMethodNotAllowed,
			)
			return
		}

		w.Header().Set("Content-Type", "application/json")

		encoder := json.NewEncoder(w)
		err := encoder.Encode(messages)

		if err != nil {
			http.Error(w, "failed to encode messages", http.StatusInternalServerError)
			return
		}
	})
}
