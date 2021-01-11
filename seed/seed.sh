#!/bin/bash

rm -rf /output_data/*

echo seeding users
mongoimport 'mongodb://db' --jsonArray --db fig --collection users --drop --file /seed/mongodb/users.json
echo seeding posts
mongoimport 'mongodb://db' --jsonArray --db fig --collection posts --drop --file /seed/mongodb/posts.json

cp /seed/mongodb/users.json /seed/output_data/users.json
cp /seed/mongodb/posts.json /seed/output_data/posts.json