import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import { apiUrl, appUrl } from '../main';
import LikeBar from './LikeBar';
import Button from './Button';
import Comment from './Comment.js';
import NewComment from './NewComment.js';

import '../styles/Post.css';
import '../styles/Main.css';

function Post({ post, user, displayLikes, displayComments }) {
    const history = useHistory()
    const token = localStorage.getItem('token');
    const loggedUsedId = localStorage.getItem('userId')
    const [postComments, setPostComments] = useState(post.Comments);
    const [readPost, setReadPost] = useState(checkIfPostIsRead())

    useEffect(() => {
        console.log('render')
    }, [readPost, postComments])

    // console.log('initial state', amountOfComments)

    function refreshComponent() {
        axios.get(`${apiUrl}/comments/post/${post.id}`, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then(res => {
                debugger
                setPostComments(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    function deletePost() {
        if (window.confirm("Are you sure you want to delete this post?") === true) {
            axios.delete(`${apiUrl}/posts/${post.id}`, {
                headers:
                {
                    "Authorization": `Bearer: ${token}`
                }
            })
                .then(res => {
                    window.alert(res.data.message)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        history.push('/newsfeed')
    }

    function checkIfPostIsRead() {
        // debugger
        const readByUsers = post.ReadPosts.map(el => el.UserId)
        if (readByUsers.indexOf(parseInt(loggedUsedId)) !== -1) {
            return true
        } else {
            return false
        }
    }

    function markAsRead() {
        axios.post(`${apiUrl}/readPosts/${post.id}`, {}, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then((res) => {
                console.log(readPost);
                setReadPost(true)
                console.log(readPost);

            }
            )
            .catch(err => console.log(err))
    }

    function markAsUnread() {
        axios.delete(`${apiUrl}/readPosts/${post.id}`, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }

        })
            .then((res) => setReadPost(false))
            .catch(err => console.log(err))
    }


    return (
        <div className="post-wrapper">
            <div className={checkIfPostIsRead() ? 'post read' : 'post unread'} >
                <div className="post-section">
                    <div className="post-details">
                        <div className="post-details__user-picture">
                            <a className="link" href={appUrl + 'user/' + user.id}><img src={require('../media/default-picture.png').default} alt={(user.firstName) + ' ' + (user.secondName) + "'s profile picture"} /></a>

                        </div>
                        {/* <div className="post-details__title">Post Title</div> */}
                        <div className="post-details__info-div">
                            <h2 className="post-details__title"><a className="link" href={appUrl + 'post/' + post.id}>{post.postTitle}</a></h2>
                            <h3 className="post-details__user-name"><a className="link" href={appUrl + 'user/' + user.id}>{user.firstName + ' ' + user.secondName}</a></h3>
                        </div>

                    </div>
                    <div className="post-details-dates">
                        <div className="post-details__created-at">Post Created: {post.createdAt}</div>
                        {post.createdAt !== post.updatedAt ? <div className="post-details__last-modified">Last Modified: {post.updatedAt}</div> : null}

                    </div>
                    {/* {post.media !== "empty" ? (<div className="post__media">
                        <img src={require(post.media).default} alt={'tablet'} />
                    </div>) : null} */}

                    <div className="post__content">{post.postContent}</div>

                    <div>
                        {(() => {
                            if (parseInt(localStorage.getItem('userId')) === user.id) {
                                return (<>
                                    <Button onClick={deletePost} className="delete" buttonContent="Delete Post" />
                                    <Link to={`/edit/post/${post.id}`}>
                                        <Button className="edit" buttonContent="Edit Post" />
                                    </Link>
                                </>
                                )
                            }
                        })()}

                    </div>
                </div>
                {displayLikes ? <LikeBar postId={post.id} likes={post.Likes} checkIfPostIsRead={checkIfPostIsRead} markAsRead={markAsRead} markAsUnread={markAsUnread} readPost={readPost} /> : null}


            </div>
            {
                displayComments ? (<div className="comment-section">
                    <NewComment postId={post.id} refreshComponent={refreshComponent} />
                    {postComments.map((comment) => (
                        <Comment key={'comment-' + comment.id} comment={comment} user={post.User} />
                    ))}
                </div>) : null
            }

        </div >
    )
}

export default Post