"use client"

import {useState, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '../../components/Profile'
import Loading from './loading'

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        }
    
        if(session?.user.id) fetchPosts();
    }, []); 

    const handleEdit = (post) => {
      router.push(`/update-echo?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm('Are you sure you want to delete this echo?');

      if(hasConfirmed){
        try {
           await fetch(`/api/echo/${post._id.toString()}`, {
            method: 'DELETE'
           })

           const filteredPosts = posts.filter((item) => item._id !== post._id);
           
           setPosts(filteredPosts);

        } catch (error) {
          console.log(error);
        }
      }
    }
  return (
    <Suspense fallback={Loading}>
      <Profile 
        name="My "
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Suspense>
  )
}

export default MyProfile