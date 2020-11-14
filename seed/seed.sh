echo seeding authors
mongoimport 'mongodb://db' --jsonArray --db fig --collection authors --drop --file /seed/mongodb/authors.json
mongoimport 'mongodb://db' --jsonArray --db fig --collection posts --drop --file /seed/mongodb/posts.json

