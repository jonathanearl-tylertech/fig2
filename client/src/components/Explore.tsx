import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import postService from '../services/post.service';

function Explore() {
  const [posts, setPosts] = useState([]);
  console.log('posts', posts);
  const list = posts.map((post: any, index) => {
    console.log(post);
    return <div key={index}><img src={post.img.urls[0]} alt='user post' /></div>;
  })
  useEffect(() => {
    postService.getAll()
      .then((posts => {
        setPosts(posts)
      }));
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