import * as fs from 'fs';

(async () => {
    const usersString = await fs.readFileSync(`${__dirname}/../input_data/authors.json`, 'utf-8');
    const users = JSON.parse(usersString);


    const generatePosts = async () => {
        const postString = await fs.readFileSync(`${__dirname}/../input_data/post.json`, 'utf-8');
        const postTemplate = JSON.parse(postString);
    
        const posts = [];
    
        for (let i = 1; i < 25; i++) {
            const user = getRandomUser();
            const post = {...postTemplate, "user": user._id};
            posts.push(post);
        }
        
        return posts;
    }
    
    const getRandomUser = () => {
        const index = Math.floor(Math.random() * users.length);
        return users[index];
    }

    console.log('writing users');
    await fs.writeFileSync(`${__dirname}/../mongodb/users.json`, JSON.stringify(users), 'utf-8');

    console.log('generating posts');
    const posts = await generatePosts();

    console.log('writing posts');
    await fs.writeFileSync(`${__dirname}/../mongodb/posts.json`, JSON.stringify(posts), 'utf-8');

})()




