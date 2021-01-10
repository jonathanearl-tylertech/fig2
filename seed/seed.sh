#!/bin/bash

echo seeding users
mongoimport 'mongodb://db' --jsonArray --db fig --collection users --drop --file /seed/mongodb/users.json
echo seeding posts
mongoimport 'mongodb://db' --jsonArray --db fig --collection posts --drop --file /seed/mongodb/posts.json

