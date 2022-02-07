import { api, getPosts, ShowPost } from '../main';
import { useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import NewPost from './NewPost';
import '../styles/NewsFeed.css';

function NewsFeed(props) {
    const history = useHistory();

    const [readPostsWhileScroll, setReadPostWhileScroll] = useState([])

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts(api.posts).then((res) => {
            setPosts(res)
        })
    }, [])

    if (props.userLoggedIn !== true) {
        history.pushState('/login')
    }



    function readPostWhileScrolling() {
        const unreadPosts = document.querySelectorAll('.post-wrapper--unread')
        unreadPosts.forEach((unreadPost) => {
            if (isInViewport(unreadPost)) {
                // console.log(unreadPost.getAttribute('data-post-id'))
                setReadPostWhileScroll([...unreadPost.getAttribute('data-post-id')])
                console.log(readPostsWhileScroll)
            }
        })

    }
    //TODO: finish ticking posts as read when on screen
    // window.addEventListener('scroll', readPostWhileScrolling)

    return (
        <div className="news-feed-wrapper">
            <h2>Welcome back {localStorage.getItem('userName')}!</h2>

            <NewPost />
            {posts ? (<ShowPost post={posts} displayLikes={true} displayComment={true} />) : (
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