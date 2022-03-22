import axios from 'axios';


import { api, apiUrl, getPosts, ShowPost } from '../main';
import { useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
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
                    console.log(res.data);
                    setPosts(res.data)
                })
                .catch(err => console.log(err))
        } else {
            getPosts(api.posts).then((res) => {
                console.log(res)
                setPosts(res)
            })
        }
    }, [])

    if (props.userLoggedIn !== true) {
        history.pushState('/login')
    }

    return (
        <div className="news-feed-wrapper">
            <h2>Welcome {localStorage.getItem('userName')}!</h2>
            {props.unread === false ? (<Button onClick={() => history.push(`/unread/`)} className="read left" buttonContent="Check new posts from your last visit" />
            ) : (
                <Button onClick={() => history.push(`/newsfeed/`)} className="read left" buttonContent="Back to homepage" />)}
            <NewPost />
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