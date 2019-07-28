package main

import (
  "github.com/phimimms/phimimms/src/server/components/database"
  "github.com/phimimms/phimimms/src/server/components/router"
)

func main() {
  database.Start()
  router.Start()
}
