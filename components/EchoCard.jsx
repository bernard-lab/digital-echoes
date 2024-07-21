"use client"; 

import { useState } from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const EchoCard = ({ 
  post, 
  handleTagClick, 
  handleEdit, 
  handleDelete
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(post.echo);
    navigator.clipboard.writeText(post.echo);
    setTimeout(() => setCopied(''), 3000);
  }

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className='echo_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex flex-1 flex-center gap-3 cursor-pointer' onClick={handleProfileClick}
        >
          <Image 
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-950'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-900'>
              {post.creator.email}
            </p>
          </div>        
        </div>
        
        <div 
          className='copy_btn'
          onClick={handleCopy}
        >
          <Image 
            src={copied === post.echo 
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            alt='Profile'
            width={12}  
            height={12}          
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-200'>{post.echo}</p>
      <p 
      className='font-inter text-sm text-orange-200 cursor-pointer'
      onClick={() => handleTagClick && handleTagClick(post.tag)}
      >{post.tag}</p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 pt-3 flex-center gap-4 border-t border-gray-100 '>
          <p 
            className='font-inter text-sm text-green-800 cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p 
            className='font-inter text-sm text-primary-orange cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default EchoCard