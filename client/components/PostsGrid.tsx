import React from 'react';
import { Link } from 'react-router-dom';
import { PostDto } from '../dtos/post.dto';

export const PostsGrid = (props: { posts: Array<PostDto> }) => {
  const { posts } = props;

  if (!posts?.length)
    return (<div>loading...</div>);

  const listItems = posts.map((post: PostDto) => (
    <li style={{ height: "293px", width: "293px" }}>
      <Link className="w-full h-full" to={`/post/${post._id}`}>
        <img className="object-cover w-full h-full" src={post.imgUrl} alt="post" />
      </Link>
    </li>
  ))

  return (
    <ul className="mx-auto grid grid-cols-3 gap-8" style={{ width: "935px" }}>
      {listItems}
    </ul>
  )
}