package repositories

import (
	"github.com/Yoboba/GNA/pkg/entities"
	"gorm.io/gorm"
)

type userPostgresRepository struct {
	db *gorm.DB
}

func NewUserPostgresRepository(db *gorm.DB) UserRepository {
	return &userPostgresRepository{db: db}
}

func (u *userPostgresRepository) Save(user entities.User) error {
	result := u.db.Create(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (u *userPostgresRepository) FindFromUsername(username string) (entities.User, error) {
	var user entities.User

	result := u.db.Where("username = ?", username).First(&user)
	if result.Error != nil {
		return user, result.Error
	}
	return user, nil
}

// ValidateEmail implements UserRepository.
func (u *userPostgresRepository) ValidateEmailAndGetPassword(email string) (uint, string, error) {
	var user entities.User

	result := u.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return 0, "", result.Error
	}
	return user.ID, user.Password, nil
}
