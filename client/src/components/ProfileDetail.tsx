import React from 'react';
import { ProfileDto } from '../dtos/profile.dto';

export function ProfileDetail(props: { profile: ProfileDto | undefined}) {
  const { profile } = props;

  if (!profile) {
    return (<div>loading...</div>)
  }

  return (
    <div className='flex flex-row flex-grow max-w-4xl mx-auto mb-11'>
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