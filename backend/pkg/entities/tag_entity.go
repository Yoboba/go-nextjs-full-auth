package entities

type Tag struct {
	Id    uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Name  string `gorm:"unique;not null" json:"name"`
	Blogs []Blog `gorm:"many2many:blog_tags;"`
}
