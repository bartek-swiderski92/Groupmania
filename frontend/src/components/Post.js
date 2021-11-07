import { api, getUserDetails, getPosts } from '../main';
import { useEffect, useState } from 'react';
import LikeBar from './LikeBar';
import Button from './Button';
import Comment from './Comment.js';
import NewComment from './NewComment.js';
// import { api } from '../main'
import '../styles/Post.css';



function Post({ post, user }) {
    // if (!post) { post = document.URL[4] }


    const [userDetails, setUsers] = useState([]);
    useEffect(() => {
        getUserDetails(api.users + '/' + user).then((res) => {
            setUsers(res)
        })
        //TODO:   Line 18:8:  React Hook useEffect has a missing dependency: 'user'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="post-wrapper">
            <div className="post">
                <div className="post-section">
                    <div className="post-details">
                        <div className="post-details__user-picture">
                            <img src={require('../media/default-picture.png').default} alt="profile" />
                        </div>
                        {/* <div className="post-details__title">Post Title</div> */}
                        <div className="post-details__title">{post.postTitle}</div>
                        <div className="post-details__user-name">{userDetails.firstName + ' ' + userDetails.secondName}</div>

                    </div>
                    <div className="post-details-dates">
                        <div className="post-details__created-at">Post Created: {post.createdAt}</div>
                        {post.createdAt !== post.updatedAt ? <div className="post-details__last-modified">Last Modified: {post.updatedAt}</div> : null}

                    </div>
                    {/* {post.media !== "empty" ? (<div className="post__media">
                        <img src={require(post.media).default} alt={'tablet'} />
                    </div>) : null} */}

                    <div className="post__content">{post.postContent}</div>
                    <Button className="delete" buttonContent="Delete Post" />
                </div>
                <LikeBar likes={post.Likes.length} />

            </div>
            <div className="comment-section">
                <NewComment />
                {post.Comments.map((comment) => (
                    <Comment key={'comment-' + comment.id} comment={comment} user={user} />
                ))}
            </div>
        </div>
    )
}

export default Post