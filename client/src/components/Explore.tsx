import React, { useEffect, useState } from 'react';

function Explore() {
    const [posts, setPosts] = useState([]);
    console.log('posts', posts);
    const list = posts.map((post: any, index) => {
        console.log(post);
        return <div key={index}><img src={post.img.urls[0]} /></div>;
    })
    useEffect(() => {
        fetch('http://localhost:5001/posts')
            .then(res => res.json())
            .then(res => {
                setPosts(res)
            });
    }, [])
    return (
        <div>
            <div>Explore</div>
            {list}
        </div>
    );
}
export default Explore;