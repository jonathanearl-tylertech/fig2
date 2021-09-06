import React, { useEffect, useState } from 'react';
import { PostsGrid } from '../components/PostsGrid';

export const Explore = () => {
  const [posts, setPostsState] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { REACT_APP_FIG_BASE_API } = process.env;
        const url = new URL(`${REACT_APP_FIG_BASE_API}/post/q`);
        const response = await fetch(url.toString());
        const result = await response.json();
        setPostsState(result);
      } catch(err) {
        console.error(err);
      } 
    }

    fetchPosts();
  }, [])

  if(!posts?.length)
    return (<div>loading...</div>)

  return(<PostsGrid posts={posts} />)
}