import React from 'react'
import './Post.css'

function Post({username, imageUrl, caption}) {
    return (
        <div className="post">
            {/* header => avatar + username */}
            <div className="post__header">
                <h3>{username}</h3>
            </div>
            
            {/* post-image */}
            <img className="post__image" src={imageUrl} alt="" />
            {/* username: caption */}
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default Post
