# Generate and seed data
this is a small helper app to generate and seed the post / authors data into mongodb

# generate seed data
data files are used to generate data that will be seeded. This is invovles randomly connecting authors to posts, then outputing posts and authors
json files will be output to mongodb folder. You can modify this data directly but it will be overwritten by the generating script. 

This data is then seeded via seed.sh script which is run from docker-compose

## steps
1) npm i
2) npm start

# customize data
You can create new users `./input_data/authors.json` by modifying the json file. These users will be randomly added to the generated posts

