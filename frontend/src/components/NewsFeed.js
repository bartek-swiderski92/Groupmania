import axios from 'axios';


import { api, apiUrl, getPosts, ShowPost } from '../main';
import { useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import NewPost from './NewPost';
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
            <h2>Welcome back {localStorage.getItem('userName')}!</h2>
            <div><a href="/unread/">Check new posts from your last visit</a></div>
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