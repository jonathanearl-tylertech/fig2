import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SessionState } from '../feature/sessionslice';
import { AuthHelper } from '../services/auth-helper';
import { RootState } from '../store';

export function ProfileDetail() {
  const { username }: { username: string} = useParams();
  const hasSession = useSelector((state: RootState) => state.session.hasSession);
  const [profile, setProfile] = useState<{username: string, name: string, summary: string} | undefined>(undefined);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (hasSession !== SessionState.isActive)
          return;
        const token = await AuthHelper.getToken();
        const { REACT_APP_FIG_BASE_API } = process.env;
        const options = { headers: { authorization: `Bearer ${token}` } };
        const url = `${REACT_APP_FIG_BASE_API}/profile/${username}`;
        const response = await fetch(url, options);
        const result = await response.json();
        setProfile(result);
      } catch(err) {
        console.log(err);
      }
    }

    fetchProfile()
  },[hasSession, username])

  if (!profile) {
    return (<div>loading...</div>)
  }

  return (
    <div className='flex flex-row flex-grow max-w-4xl mx-auto'>
      <div className="flex justify-center" style={{ width: "300px" }}>
        <div style={{ width: "150px", height: "150px" }}>
          <img className="h-full w-full rounded-full" src="https://via.placeholder.com/320" alt="user profile" />
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex flex-row h-10 items-center mb-4">
          <div className="mr-4 text-2xl">{profile.username}</div>
          {/* <div className="mr-1">edit</div>
          <div>config</div> */}
        </div>

        <div className="flex flex-row h-8 mb-4">
          <div className="mr-12"><span className="font-semibold">53</span> posts</div>
          <div className="mr-12"><span className="font-semibold">53</span> followers</div>
          <div className="mr-12"><span className="font-semibold">53</span> following</div>
        </div>

        <div className="font-semibold capitalize">{profile.name}</div>
        <div>{profile.summary}</div>
      </div>
    </div>
  )
}