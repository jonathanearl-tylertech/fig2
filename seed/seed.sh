echo seeding authors
mongoimport 'mongodb://db' --jsonArray --db fig --collection users --drop --file /seed/mongodb/users.json
mongoimport 'mongodb://db' --jsonArray --db fig --collection posts --drop --file /seed/mongodb/posts.json

