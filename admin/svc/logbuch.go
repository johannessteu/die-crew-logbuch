package svc

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"sort"
)

type Logbuch struct {
	devMode           bool
	cachedNewestGames int
	cachedGames       map[string]Game
	client            *FirestoreClient
}

func NewLogbuch(devMode bool) *Logbuch {
	fClient := NewFirestoreClient()
	cachedGames := make(map[string]Game)
	var cachedNewestGames int

	if devMode {
		cachedGames = GetMockData()
		cachedNewestGames = len(cachedGames)
		fClient = nil
	}

	return &Logbuch{
		devMode:           devMode,
		client:            fClient,
		cachedGames:       cachedGames,
		cachedNewestGames: cachedNewestGames,
	}
}

func (l *Logbuch) FixGames() error {
	return l.client.FixGames()
}

func (l *Logbuch) FindGame(id string) (Game, error) {

	// Is the game in the cache?
	if game, ok := l.cachedGames[id]; ok {
		return game, nil
	}

	// Fetch the game from the database
	game, err := l.client.GetGame(id)

	if err != nil {
		return Game{}, err
	}

	l.cachedGames[id] = game
	return game, nil
}

func (l *Logbuch) NewestGames(limit int) []Game {
	if limit == 0 {
		limit = 10
	}

	// Return cached games
	if l.cachedNewestGames > 0 {
		if limit <= l.cachedNewestGames {
			var slice []Game
			for _, value := range l.cachedGames {
				slice = append(slice, value)
			}

			sort.Slice(slice, func(i, j int) bool {
				return slice[i].StartedAt.After(slice[j].StartedAt)
			})

			return slice[:limit]
		}
	}

	// Fallback: Return all cached games when in dev mode
	if l.devMode {
		slice := make([]Game, len(l.cachedGames))
		for _, value := range l.cachedGames {
			slice = append(slice, value)
		}

		sort.Slice(slice, func(i, j int) bool {
			return slice[i].StartedAt.After(slice[j].StartedAt)
		})

		return slice
	}

	games := l.client.GetGames(limit)

	// cache games
	for _, game := range games {
		l.cachedGames[game.Id] = game
	}

	if len(games) > len(l.cachedGames) {
		l.cachedNewestGames = len(games)
	}

	return games
}

func GetMockData() map[string]Game {
	data, err := ioutil.ReadFile(getMockFilename())

	var games []Game
	gameMap := make(map[string]Game)

	if err != nil {
		return gameMap
	}

	err = json.Unmarshal(data, &games)
	if err != nil {
		return gameMap
	}

	for _, game := range games {
		gameMap[game.Id] = game
	}
	return gameMap
}

func (l *Logbuch) UpdateMockData() {

	games := l.NewestGames(50)
	jsonData, _ := json.Marshal(games)

	err := ioutil.WriteFile(getMockFilename(), jsonData, 0644)

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Dummy data was updated!")
}

func getMockFilename() string {
	dir, _ := os.Getwd()
	mockDir := path.Join(dir, "mock")

	return mockDir + "/games.json"
}
