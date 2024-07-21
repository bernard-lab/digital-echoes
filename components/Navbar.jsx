"use client";

import Link from 'next/link'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';


const Nav = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await getProviders({revalidate: 20});

        setProviders(response);
        })();
    }, []);

  return (
    <nav className='w-full flex-between mb-16 pt-3'>
        <Link href='/' className='flex flex-center gap-2'>
            <Image 
                src='../assets/images/digital-echo.svg'
                alt='Logo'
                width={40}
                height={40}
                className='object-contain'
            />
            <p className='logo_text'>Digital Echoes</p>
        </Link>

       
        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-echo' className='primary_btn'>
                        Create Post
                    </Link>

                    <button type='button' onClick={signOut} className='secondary_btn'>Sign Out</button>

                    <Link href='/profile'>
                        <Image 
                            src={session?.user.image}
                            alt='Profile'
                            width={37}
                            height={37}
                            className='object-contain rounded-full'
                        />
                    </Link>
                </div>
            ) : (
            <>
                {providers && Object.values(providers).map((provider) => (
                    <button 
                    type='button' 
                    key={provider.name} 
                    className='primary_btn'                    
                    onClick={() => signIn(provider.id)} 
                    >
                        Sign In
                    </button>
                ))}
            </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className='rounded-full hover:cursor-pointer'
                    alt='Profile'
                    onClick={() => setToggleDropdown(!toggleDropdown)}
                    />

                    {toggleDropdown && (
                        <div className='dropdown'>
                            <Link href='/profile' className='dropdown_link' 
                            onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link href='/create-echo' className='dropdown_link' 
                            onClick={() => setToggleDropdown(false)}
                            >
                                Create Echo
                            </Link>
                            <button type='button' 
                            className='w-full mt-5 primary_btn' 
                            onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                            >
                               Sign Out 
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                {providers && Object.values(providers).map((provider) => (
                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='primary_btn'>
                        Sign In
                    </button>
                ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav