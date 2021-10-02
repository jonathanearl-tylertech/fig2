import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import HorizontalLine from '../components/HorizontalLine';
import { PostsGrid } from '../components/PostsGrid';
import { CommentSection } from '../components/Comments';
import { PostDto } from '../dtos/post.dto';
import { ProfileDto } from '../dtos/profile.dto';
import postService from '../services/post.service';
import profileService from '../services/profile.service';


export const Post = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDto | undefined>()
  const [profile, setProfile] = useState<ProfileDto | undefined>();
  const [profilePosts, setProfilePosts] = useState<PostDto[]>([])

  const fetchPost = async (id: string) => {
    const postResult = await postService.getPost(id);
    setPost(postResult);
    return postResult;
  }

  const fetchProfile = async (id: string) => {
    const profileResult = await profileService.getProfileById(id);
    setProfile(profileResult);
    return profileResult;
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postId) return;
        const postResult = await fetchPost(postId);
        await fetchProfile(postResult.profileId);
        const profilePostResults = await postService.search({ profileId: postResult.profileId });
        setProfilePosts(profilePostResults.slice(0, 6));
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [postId])

  if (!post || !profile)
    return (<div>loading...</div>)

  return (
    <div className="mx-auto" style={{ width: '935px' }}>
      <div className="flex border border-gray-300 rounded-sm">
        <img className="object-cover" src={post.imgUrl} style={{ width: '600px', height: '600px' }} alt="post" />
        <CommentSection post={post} profile={profile} fetchPost={fetchPost}></CommentSection>
      </div>
      <HorizontalLine className="my-8" />
      <div className="font-semibold mb-4" style={{ color: 'rgb(142, 142, 142)' }}>More posts from <Link to={`/${profile?.username}`}><span className="text-black">{profile?.username}</span></Link></div>
      <PostsGrid posts={profilePosts} />
    </div>
  )
}