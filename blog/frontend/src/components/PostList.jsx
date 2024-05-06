import "../styles/PostList.css"
import { Link } from 'react-router-dom';





function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function PostList({ posts }) {

    return (
        <div>
        {posts?.map(post => (
            <Link to={`api/posts/${post.id}`} className="link" key={post.id}>
                <div className="post" id="card2">
                    <div className="image-container">
                    {post.image && <img src={post.image} alt={`Image for ${post.title}`} style={{ width: '100%' }} />}
                    </div>
                
                    <div className="content">
                        <h2>{post.title}</h2>
                        <p>{post.author} - {formatDate(post.published_date)}</p>
                        <p>{post.content.substring(0, 200)}...</p>
                    </div>
                </div>
                  
                         {/* Check if post.image exists and display it */}
                         
                   
            </Link>
        ))}
    </div>
    
    );
}

export default PostList;
