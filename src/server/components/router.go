package router

import (
	"github.com/gin-gonic/gin"
)

func Start() {
	router := gin.Default()

	router.Static("/", "./public")

	router.Run(":3000")
}
