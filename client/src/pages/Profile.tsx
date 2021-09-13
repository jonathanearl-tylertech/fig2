import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PostsGrid } from '../components/PostsGrid';
import { ProfileDetail } from '../components/ProfileDetail';
import { SessionState } from '../feature/sessionslice';
import { RootState } from '../store';
import { ProfileDto } from '../dtos/profile.dto';
import profileService from '../services/profile.service';
import postService from '../services/post.service';
import { PostDto } from '../dtos/post.dto';

export const Profile = () => {
  const hasSession = useSelector((state: RootState) => state.session.hasSession);
  const { username }: { username: string } = useParams();
  const [profile, setProfile] = useState<ProfileDto | undefined>(undefined);
  const [posts, setPostsState] = useState<PostDto[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (hasSession !== SessionState.isActive)
        return;
      try {
        const result = await profileService.getProfileByUsername(username);
        setProfile(result);
        await fetchPosts(result._id)
      } catch (err) {
        console.log(err);
      }
    }

    const fetchPosts = async (profileId: string) => {
      try {
        const result = await postService.search({profileId: profileId})
        setPostsState(result);
      } catch(err) {
        console.log(err);
      } 
    }

    fetchProfile();
  }, [hasSession, username])

  if (hasSession !== SessionState.isActive || !profile)
    return (<div>loading...</div>)

  return (
    <>
      <ProfileDetail profile={profile} />
      <PostsGrid posts={posts} />
    </>
  )
}
