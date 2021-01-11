import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Explore() {
    const [posts, setPosts] = useState([]);
    console.log('posts', posts);
    const list = posts.map((post: any, index) => {
        console.log(post);
        return <div key={index}><img src={post.img.urls[0]} alt='user post' /></div>;
    })
    useEffect(() => {
        fetch('http://localhost:5001/posts')
            .then(res => res.json())
            .then(res => {
                setPosts(res)
            });
    }, [])
    return (
        <Main>
            <div>Explore!</div>
            {list}
        </Main>
    );
}
export default Explore;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 44px);
  overflow-y: scroll;
`