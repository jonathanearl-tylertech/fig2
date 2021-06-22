import React from 'react';
import { gql, useQuery } from '@apollo/client' 

const PROFILE = gql`
  query GetUserProfile {
    profile(username: "whattheearl")
    {  summary, username, name }
  }
`;

export default function Profile() {
  const { loading, error, data } = useQuery(PROFILE);

  if(loading) {
    return (<div>loading...</div>)
  }

  if(error) {
    return (<div>error...</div>)
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
          <div className="mr-4 text-2xl">{data.profile.username}</div>
          <div className="mr-1">edit</div>
          <div>config</div>
        </div>

        <div className="flex flex-row h-8 mb-4">
          <div className="mr-12"><span className="font-semibold">53</span> posts</div>
          <div className="mr-12"><span className="font-semibold">53</span> followers</div>
          <div className="mr-12"><span className="font-semibold">53</span> following</div>
        </div>

        <div className="font-semibold capitalize">{data.profile.name}</div>
        <div>{data.profile.summary}</div>
      </div>
    </div>
  )
}