package models

import "gorm.io/gorm"

type Message struct {
	gorm.Model
	Sender   string
	Receiver string
	Message  string
}
