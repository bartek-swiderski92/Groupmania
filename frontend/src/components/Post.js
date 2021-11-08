import { api, getUserDetails, appUrl } from '../main';
import { useEffect, useState } from 'react';
import LikeBar from './LikeBar';
import Button from './Button';
import Comment from './Comment.js';
import NewComment from './NewComment.js';
import '../styles/Post.css';
import '../styles/Main.css';

function Post({ post, user, displayLikes, displayComments }) {
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
                            <a className="link" href={appUrl + 'user/' + post.UserId}><img src={require('../media/default-picture.png').default} alt={userDetails.firstName + ' ' + userDetails.secondName + "'s profile picture"} /></a>

                        </div>
                        {/* <div className="post-details__title">Post Title</div> */}
                        <h2 className="post-details__title"><a className="link" href={appUrl + 'post/' + post.id}>{post.postTitle}</a></h2>
                        <h3 className="post-details__user-name"><a className="link" href={appUrl + 'user/' + post.UserId}>{userDetails.firstName + ' ' + userDetails.secondName}</a></h3>

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
                {displayLikes ? <LikeBar likes={post.Likes.length} /> : null}


            </div>
            {displayComments ? (<div className="comment-section">
                <NewComment />
                {post.Comments.map((comment) => (
                    <Comment key={'comment-' + comment.id} comment={comment} user={user} />
                ))}
            </div>) : null}

        </div>
    )
}

export default Post