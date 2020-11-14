echo seeding authors
mongoimport 'mongodb://db' --jsonArray --db fig --collection authors --drop --file /mongo/authors.json
mongoimport 'mongodb://db' --jsonArray --db fig --collection posts --drop --file /mongo/posts.json

