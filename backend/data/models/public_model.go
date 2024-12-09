package models

type Public struct {
	Username  string `gorm:"primaryKey" json:"username"`
	PublicKey string `gorm:"primaryKey" json:"key"`
}
