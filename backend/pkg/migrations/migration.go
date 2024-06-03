package migrations

type Migration interface {
	MockDataMigrate() error
	Reset() error
}
