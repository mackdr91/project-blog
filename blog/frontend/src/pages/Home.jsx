import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TagsComponent from '../components/Tags';
import PostList from '../components/PostList';
import "../styles/Home.css"

function Home() {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tags/')
            .then(response => {
                setTags(response.data.results);
            })
            .catch(error => console.error('Error fetching tags:', error));

        const fetchUrl = selectedTag ? `http://127.0.0.1:8000/api/posts/?tags__name=${selectedTag}` : 'http://127.0.0.1:8000/api/posts/';
        axios.get(fetchUrl)
            .then(response => {
                setPosts(response.data.results);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [selectedTag]);
  return(
    <div>
    <h1 id="hero-title">The Thick of IT</h1>
    
    <TagsComponent tags={tags} onSelectTag={setSelectedTag} />
   
    <div className="grid-container">
         <main>
            {/* Main content goes here, such as a list of posts */}
            <PostList posts={posts} />
        </main>
        <aside className="sidebar">
            {/* Sidebar content goes here */}
            Sidebar Content
        </aside>
       
    </div>
</div>
  
  )
}

export default Home