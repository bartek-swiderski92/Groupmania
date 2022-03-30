import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import { apiUrl, appUrl, formatDate } from '../main';
import LikeBar from './LikeBar';
import Button from './Button';
import Comment from './Comment.js';
import NewComment from './NewComment.js';

import '../styles/Post.css';
import '../styles/Main.css';

function Post({ post, user, displayLikes, displayComments, reverseComments }) {
    const history = useHistory()
    const token = localStorage.getItem('token');
    const loggedUsedId = localStorage.getItem('userId');
    const [postComments, setPostComments] = useState(post.Comments);
    const [readPost, setReadPost] = useState(checkIfPostIsRead())
    useEffect(() => {
    }, [readPost, postComments])

    useEffect(() => {
        const postWrapperSelector = document.querySelector(`#post-wrapper-id-${post.id}`);
        if (!readPost) {
            postWrapperSelector.addEventListener('click', markAsRead)
        }
        if (!readPost && document.URL.split('/').indexOf('post') !== -1) {
            markAsRead()
        }
        // eslint-disable-next-line
    }, [])


    function refreshComponent() {
        axios.get(`${apiUrl}/comments/post/${post.id}`, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then(res => {
                if (reverseComments === true) {
                    setPostComments(res.data.reverse())
                } else {
                    setPostComments(res.data)

                }

            })
            .catch(err => {
                console.log(err)
            })

    }
    function deletePost() {
        if (window.confirm("Are you sure you want to delete this post?") === true) {
            axios.delete(`${apiUrl}/posts/${post.id}`, {
                headers: {
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
            .then(() => {
                const postWrapperSelector = document.querySelector(`#post-wrapper-id-${post.id}`);
                setReadPost(true)
                postWrapperSelector.classList.add('post-wrapper--read')
                postWrapperSelector.classList.remove('post-wrapper--unread')
                postWrapperSelector.removeEventListener('click', markAsRead);
            })
            .catch(err => console.log(err))
    }

    function markAsUnread() {
        axios.delete(`${apiUrl}/readPosts/${post.id}`, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then(() => {
                const postWrapperSelector = document.querySelector(`#post-wrapper-id-${post.id}`);
                setReadPost(false)
                postWrapperSelector.classList.remove('post-wrapper--read')
                postWrapperSelector.classList.add('post-wrapper--unread')
            })
            .catch(err => console.log(err))
    }

    return (
        <div data-post-id={post.id} id={`post-wrapper-id-${post.id}`} className={readPost ? 'post-wrapper post-wrapper--read' : 'post-wrapper post-wrapper--unread'}>
            <div className="post" >
                <div className="post-section">
                    <div className="post-details">
                        <div className="post-details__user-picture">
                            <a className="link" href={appUrl + 'user/' + user.id}><img src={require('../media/default-picture.png').default} alt={(user.firstName) + ' ' + (user.secondName) + "'s profile picture"} /></a>
                        </div>
                        <div className="post-details__info-div">
                            <h2 className="post-details__title"><a className="link" href={appUrl + 'post/' + post.id}>{post.postTitle}</a></h2>
                            <h3 className="post-details__user-name"><a className="link" href={appUrl + 'user/' + user.id}>{user.firstName + ' ' + user.secondName}</a></h3>
                        </div>
                    </div>
                    <div className="post-details-dates">
                        <div className="post-details__created-at">Post Created: {formatDate(post.createdAt)}</div>
                        {post.createdAt !== post.updatedAt ? <div className="post-details__last-modified">Last Modified: {formatDate(post.updatedAt)}</div> : null}
                    </div>
                    {post.media?.length > 0 ? (
                        <div className="post__media">
                            <img src={post.media} alt={post.postTitle} />
                        </div>
                    ) : null}
                    <div className="post__content">{post.postContent}</div>
                    <div>
                        {(() => {
                            if (parseInt(localStorage.getItem('userId')) === user.id) {
                                return (<>
                                    <Button onClick={deletePost} className="delete" buttonContent="Delete Post" />
                                    <Link to={`/edit/post/${post.id}`}>
                                        <Button className="edit" buttonContent="Edit Post" />
                                    </Link>
                                </>)
                            }
                        })()}
                    </div>
                </div>
                {displayLikes ? <LikeBar postId={post.id} likes={post.Likes} checkIfPostIsRead={checkIfPostIsRead} markAsRead={markAsRead} markAsUnread={markAsUnread} readPost={readPost} /> : null}

            </div>
            {displayComments ? (<div className="comment-section">
                <NewComment postId={post.id} refreshComponent={refreshComponent} markAsRead={markAsRead} readPost={readPost} />

                {reverseComments ? (
                    postComments.map((comment) => (
                        <Comment key={'comment-' + comment.id} comment={comment} user={post.User} refreshComponent={refreshComponent} reverseComments={reverseComments} />
                    ))
                ) : (
                    postComments.map((comment) => (
                        <Comment key={'comment-' + comment.id} comment={comment} user={post.User} refreshComponent={refreshComponent} />
                    ))
                )}
            </div>) : null}
        </div >
    )
}

export default Post