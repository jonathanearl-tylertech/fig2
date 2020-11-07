echo seeding authors
mongoimport 'mongodb://db' --jsonArray --db fig --collection authors --drop --file /seed/authors.json

