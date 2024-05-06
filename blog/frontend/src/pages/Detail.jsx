import React, { useEffect, useState } from 'react';
import api from "../api";
import { useParams } from 'react-router-dom';
import PostDetail from '../components/PostDetail';
import "../styles/Detail.css";  // Ensure you have this CSS file created

function Detail() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        api.get(`http://127.0.0.1:8000/api/posts/${id}/`)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching post:', err);
                setError('Failed to fetch post');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>No post found!</p>;

    return (
      <div>
         <div className="post-background" style={{ backgroundImage: `url(${post.image})` }}>
            
            <h1 className='title-hero'>{post.title}</h1>

        <div className="pd">
          <PostDetail post={post} />
        </div>
       
         
      </div>

      </div>
       
        
    );
}

export default Detail;
