import React, { useEffect, useState } from 'react';
import { PostsGrid } from '../components/PostsGrid';
import { PostDto } from '../dtos/post.dto';
import PostService from '../services/post.service';

export const Explore = () => {
  const [posts, setPostsState] = useState<PostDto[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await PostService.search({});
        setPostsState(posts);
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