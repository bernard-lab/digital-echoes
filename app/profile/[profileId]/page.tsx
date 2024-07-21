"use client"

import {useState, useEffect } from 'react'
import {useSearchParams } from 'next/navigation'
import Profile from '../../../components/Profile';

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const username = searchParams.get("name");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.profileId}/posts`);
          const data = await response.json();
          setPosts(data);
        }
    
        if(params.profileId) fetchPosts();
        
    }, [params.profileId]); 

  return (
    <Profile 
          name={`${username}'s`}
          data={posts} 
          handleEdit={()=>{}} 
          handleDelete={undefined}    />
  )
}

export default UserProfile;