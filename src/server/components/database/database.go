package database

import (
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"

  "context"
  "log"
  "time"
)

func Start() {
  client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
  if err != nil {
    log.Fatal(err)
    return
  }

  ctx, cancel := context.WithTimeout(context.Background(), 20 * time.Second)

  defer cancel()

  err = client.Connect(ctx)
  if err != nil {
    log.Fatal(err)
    return
  }

  log.Println("Connected to MongoDB")
}
