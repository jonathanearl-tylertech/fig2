import React, { useState } from 'react'
import { PostDto } from '../dtos/post.dto';
import { ProfileDto } from '../dtos/profile.dto';
import postService from '../services/post.service';

export const CommentSection = ({ post, profile, fetchPost }: { post: PostDto, profile: ProfileDto, fetchPost: any }) => {
  const [comment, setComment] = useState<string>('');

  const addComment = async (id: string, comment: string) => {
    if (!comment) {
      return;
    }
    await postService.addComment(id, comment);
    setComment('');
    await fetchPost(post._id);
  }

  const items = post.comments.map((c) => (<li><span className="font-semibold mb-4 mr-1">{c.username}</span><span>{c.message}</span></li>));

  return (
    <section className="w-full h-full flex flex-col" style={{ height: '600px' }}>
      <header className="flex w-full p-4 border-b border-gray-200 mb-2">
        <img className="object-cover rounded-full" style={{ width: '32px', height: '32px' }} src={post.imgUrl} alt={profile.username} />
        <div className="pl-4">{profile?.username}</div>
      </header>
      <ol className="flex flex-col flex-grow w-auto mb-4 px-4">
        {items}
      </ol>
      <div className="flex align-center border-t border-gray-200">
        <input id="comment" className="w-full py-4 border-0" onChange={(event: React.FormEvent<HTMLInputElement>) => setComment(event.currentTarget.value)} value={comment} />
        <button className="h-full px-4" onClick={() => addComment(post._id, comment)} style={{color: "rgb(0, 149, 246)"}}>Post</button>
      </div>
    </section>)
}