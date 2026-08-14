package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestChannelsHandlerReturnsOK(t *testing.T) {
	channels := []Channel{
		{ID: "1", Name: "general", Removable: false},
		{ID: "2", Name: "random", Removable: true},
	}

	handler := channelsHandler(channels)

	request := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/channels",
		nil,
	)

	recorder := httptest.NewRecorder()

	handler.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, recorder.Code)
	}
}

func TestChannelsHandlerReturnsJSONContentType(t *testing.T) {
	handler := channelsHandler(nil)

	request := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/channels",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.ServeHTTP(recorder, request)

	got := recorder.Header().Get("Content-Type")
	want := "application/json"

	if got != want {
		t.Fatalf("expected Content-Type %q, got %q", want, got)
	}
}

func TestChannelsHandlerReturnsChannels(t *testing.T) {
	channels := []Channel{
		{ID: "1", Name: "general", Removable: false},
		{ID: "2", Name: "random", Removable: true},
	}

	handler := channelsHandler(channels)
	request := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/channels",
		nil,
	)
	recorder := httptest.NewRecorder()

	handler.ServeHTTP(recorder, request)

	var got []Channel

	err := json.NewDecoder(recorder.Body).Decode(&got)
	if err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if len(got) != len(channels) {
		t.Fatalf(
			"expected %d channels, got %d",
			len(channels),
			len(got),
		)
	}

	for index, want := range channels {
		if got[index] != want {
			t.Fatalf(
				"channel %d: expected %+v, got %+v",
				index,
				want,
				got[index],
			)
		}
	}
}

func TestChannelsHandlerRejectsUnsupportedMethod(t *testing.T) {
	handler := channelsHandler(nil)

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/channels",
		nil,
	)

	recorder := httptest.NewRecorder()

	handler.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusMethodNotAllowed {
		t.Fatalf(
			"expected status %d, got %d",
			http.StatusMethodNotAllowed,
			recorder.Code,
		)
	}
}
