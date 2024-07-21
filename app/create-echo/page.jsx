"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form';

const CreateEcho = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] =  useState({
        echo: '',
        tag: '',
    })

    const createEcho = async (e) => {
        e.preventDefault();//prevent page reload
        setSubmitting(true);
        try {
            const response = await fetch('api/echo/new', {
                method: 'POST',
                body: JSON.stringify({
                    echo: post.echo,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createEcho}
    />
  )
}

export default CreateEcho;