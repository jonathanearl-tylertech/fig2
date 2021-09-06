import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PostsGrid } from '../components/PostsGrid';
import { ProfileDetail } from '../components/ProfileDetail';
import { SessionState } from '../feature/sessionslice';
import { AuthHelper } from '../services/auth-helper';
import { RootState } from '../store';
import { ProfileDto } from '../dtos/profile.dto';

export const Profile = () => {
  const hasSession = useSelector((state: RootState) => state.session.hasSession);
  const { username }: { username: string } = useParams();
  const [profile, setProfile] = useState<ProfileDto | undefined>(undefined);
  const [posts, setPostsState] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (hasSession !== SessionState.isActive)
        return;

      try {
        const token = await AuthHelper.getToken();
        const { REACT_APP_FIG_BASE_API } = process.env;
        const options = { headers: { authorization: `Bearer ${token}` } };
        const url = `${REACT_APP_FIG_BASE_API}/profile/${username}`;
        const response = await fetch(url, options);
        const result = await response.json();
        setProfile(result);
        await fetchPosts(result._id)
      } catch (err) {
        console.log(err);
      }
    }

    const fetchPosts = async (profileId: string) => {
      try {
        const { REACT_APP_FIG_BASE_API } = process.env;
        const url = new URL(`${REACT_APP_FIG_BASE_API}/post/q`);
        const params = url.searchParams;
        params.append('profileId', profileId);
        const response = await fetch(url.toString());
        const result = await response.json();
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
