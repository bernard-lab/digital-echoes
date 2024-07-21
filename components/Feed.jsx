"use client";

import { useState, useEffect } from 'react'
import EchoCard from './EchoCard';

export const revalidate = 10;

const EchoCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 echo_layout'>
      {data.map((post) => (
        <EchoCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);  
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/echo');
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  const filterEchoes = (searchText) => {
    const regXp = new RegExp(searchText, "i");
    return posts.filter((item) =>
      regXp.test(item.creator.username) || 
      regXp.test(item.tag) ||
      regXp.test(item.echo)
    );
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterEchoes(e.target.value);
        setSearchedResults(searchResult);
      }, 300)
    );
  }

  const handleTagClick = (tagName) => {    
    setSearchText(tagName);
    
    const searchResult = filterEchoes(tagName);
    setSearchedResults(searchResult);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type="text" 
        className='search_input peer'
        placeholder='Search for a tag or username' 
        value={searchText} 
        onChange={handleSearchChange}
        required
        />
      </form>

      {searchText ? (
        <EchoCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <EchoCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed;