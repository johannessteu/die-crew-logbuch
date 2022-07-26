package svc

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"google.golang.org/api/option"
	"time"
)

type GameType = string

const (
	Sea   GameType = "sea"
	Space GameType = "space"
)

type Mission struct {
	Number     int64     `json:"number"`
	Success    bool      `json:"success"`
	Note       string    `json:"note"`
	Took       int64     `json:"took"`
	StartedAt  time.Time `json:"startedAt"`
	FinishedAt time.Time `json:"finishedAt"`
	Trials     int64     `json:"trials"`
}

type Game struct {
	Type           GameType  `json:"type"`
	CrewName       string    `json:"crewName"`
	Id             string    `json:"id"`
	CurrentMission int64     `json:"currentMission"`
	TookTotal      int64     `json:"tookTotal"`
	StartedAt      time.Time `json:"startedAt"`
	Missions       []Mission `json:"missions"`
	Players        []string  `json:"players"`
}

type FirestoreClient struct {
	client *firestore.Client
}

func NewFirestoreClient() *FirestoreClient {
	ctx := context.Background()

	client, err := firestore.NewClient(ctx, "crew-logbuch", option.WithCredentialsFile("../credentials.json"))

	if err != nil {
		panic(err)
	}

	return &FirestoreClient{
		client: client,
	}
}

func (a *FirestoreClient) FixGames() error {

	documents := a.client.Collection("games").Documents(context.Background())

	allDocs, _ := documents.GetAll()

	for _, doc := range allDocs {
		data := doc.Data()
		fmt.Println("==============================")
		fmt.Println("Checking game:", doc.Ref.ID)

		if _, ok := data["createdAt"]; !ok {
			fmt.Println("... fixing")
			missionZero := data["missions"].([]interface{})[0].(map[string]interface{})
			if missionZero["startedAt"] != nil {
				if _, err := doc.Ref.Update(context.Background(), []firestore.Update{{Path: "createdAt", Value: missionZero["startedAt"]}}); err != nil {
					return err
				} else {
					fmt.Println("... Done!")

				}
			}
		}
	}
	return nil
}

func (a *FirestoreClient) GetGame(id string) (Game, error) {
	// Fetch the game from the database
	ctx := context.Background()
	doc, err := a.client.Collection("games").Doc(id).Get(ctx)

	if err != nil {
		return Game{}, err
	}

	game := mapFireStoreDataToGame(doc.Ref.ID, doc.Data())

	return game, nil
}

func (a *FirestoreClient) GetGames(limit int) []Game {
	var games []Game

	ctx := context.Background()
	documents := a.client.Collection("games").OrderByPath([]string{"createdAt"}, firestore.Desc).Limit(limit).Documents(ctx)
	allDocs, _ := documents.GetAll()

	for _, doc := range allDocs {
		data := doc.Data()
		game := mapFireStoreDataToGame(doc.Ref.ID, data)
		games = append(games, game)
	}

	return games
}

func mapFireStoreDataToGame(gameID string, data map[string]interface{}) Game {
	gameType := Space
	var missions []Mission
	var tookTotal int64
	var player []string

	if t := data["type"]; t == "deepSea" {
		gameType = Sea
	}

	for _, m := range data["missions"].([]interface{}) {
		theMission := m.(map[string]interface{})

		var took, startedAt, finishedAt int64

		if t := theMission["took"]; t != nil {
			took = t.(int64)
			tookTotal += took
		}

		if s := theMission["startedAt"]; s != nil {
			startedAt = s.(int64)
		}

		if f := theMission["finishedAt"]; f != nil {
			finishedAt = f.(int64)
		}

		missions = append(missions, Mission{
			Number:     theMission["mission"].(int64),
			Success:    theMission["success"].(bool),
			Note:       theMission["note"].(string),
			Took:       took,
			StartedAt:  time.Unix(startedAt/1000, 0),
			FinishedAt: time.Unix(finishedAt/1000, 0),
			Trials:     theMission["trials"].(int64),
		})
	}

	for _, p := range data["player"].([]interface{}) {
		player = append(player, p.(string))
	}

	return Game{
		Type:           gameType,
		CrewName:       data["crewName"].(string),
		Id:             gameID,
		CurrentMission: data["currentMission"].(int64),
		TookTotal:      tookTotal,
		StartedAt:      missions[0].StartedAt,
		Missions:       missions,
		Players:        player,
	}
}
