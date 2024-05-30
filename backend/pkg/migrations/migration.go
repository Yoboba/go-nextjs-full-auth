package migrations

type Migration interface {
	TableMigrate() error
	MockDataMigrate() error
	FetchingTest() error
}
