package main

import (
	"encoding/json"
	"net/http"
)

type Channel struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Removable bool   `json:"removable"`
}

func channelsHandler(channels []Channel) http.Handler {
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
		err := encoder.Encode(channels)

		if err != nil {
			http.Error(w, "failed to encode channels", http.StatusInternalServerError)
			return
		}
	})
}
