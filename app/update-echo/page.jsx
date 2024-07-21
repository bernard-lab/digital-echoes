"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../../components/Form";
import Loading from "./loading";

const UpdateEcho = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const echoId = searchParams.get("id");

  const [post, setPost] = useState({ echo: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getEchoDetails = async () => {
      const response = await fetch(`/api/echo/${echoId}`); 
      const data = await response.json();
      
      setPost({
        echo: data.echo,
        tag: data.tag,
      })
      }
    if (echoId) getEchoDetails();
  }, [echoId]);

  
  const editEcho = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!echoId) return alert("Missing echoId!");

    try {
      const response = await fetch(`/api/echo/${echoId}`, {
        method: "PATCH",
        body: JSON.stringify({
          echo: post.echo,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<Loading/>}>
      <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editEcho}
      />
      </Suspense>
  );
};

export default UpdateEcho