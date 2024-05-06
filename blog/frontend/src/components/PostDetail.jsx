// PostDetail.jsx
import React from 'react';
import "../styles/PostDetail.css"

function PostDetail({ post }) {
    return (
        <div className="container">
            <div className="card">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </div>
    );
}

export default PostDetail;
