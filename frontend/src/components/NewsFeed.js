import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { api, apiUrl, getPosts, ShowPost } from '../main';
import NewPost from './NewPost';
import Button from './Button';
import '../styles/NewsFeed.css';

function NewsFeed(props) {
    const history = useHistory();
    const token = localStorage.getItem('token');

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (props.unread === true) {
            axios.get(`${apiUrl}/posts/unread`, {
                headers: {
                    "Authorization": `Bearer: ${token}`
                }
            })
                .then(res => {
                    setPosts(res.data)
                })
                .catch(err => console.log(err))
        } else {
            getPosts(api.posts).then((res) => {
                setPosts(res)
            })
        }
        // eslint-disable-next-line
    }, [])

    if (props.userLoggedIn !== true) {
        history.pushState('/login')
    }

    return (
        <div className="main-wrapper">
            {props.unread === true ? (
                <>
                    <Button onClick={() => history.push(`/newsfeed/`)} id="unread-button" className="read left" buttonContent="Back to homepage" />
                    <h2>Check your posts from last visit:</h2>
                </>
            ) : (
                <>
                    <Button onClick={() => history.push(`/unread/`)} id="unread-button" className="read left" buttonContent="Check new posts" />
                    <h2>Welcome {localStorage.getItem('userName')}!</h2>
                    <NewPost />
                </>
            )}
            {posts.length ? (<ShowPost post={posts} displayLikes={true} displayComment={true} unread={props.unread} />) : (
                <div>
                    <h2 className='error-message'>
                        No posts to display
                    </h2>
                </div>)
            }
        </div>
    )
}

export default NewsFeed