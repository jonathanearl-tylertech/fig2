import * as fs from 'fs';

(async () => {
    const authorsString = await fs.readFileSync(`${__dirname}/../input_data/authors.json`, 'utf-8');
    const authors = JSON.parse(authorsString);


    const generatePosts = async () => {
        const postString = await fs.readFileSync(`${__dirname}/../input_data/post.json`, 'utf-8');
        const postTemplate = JSON.parse(postString);
    
        const posts = [];
    
        for (let i = 1; i < 25; i++) {
            const post = {...postTemplate};
            const author = getRandomAuthor();
            post.author = author;
            post._id = i;
            posts.push(post);
        }
        
        return posts;
    }
    
    const getRandomAuthor = () => {
        const index = Math.floor(Math.random() * authors.length);
        return authors[index];
    }

    console.log('writing authors');
    await fs.writeFileSync(`${__dirname}/../mongodb/authors.json`, JSON.stringify(authors), 'utf-8');

    console.log('generating posts');
    const posts = await generatePosts();

    console.log('writing posts');
    await fs.writeFileSync(`${__dirname}/../mongodb/posts.json`, JSON.stringify(posts), 'utf-8');

})()




