import { api, getContent, getUserDetails } from '../main';
import { useEffect, useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import '../styles/NewsFeed.css';

async function getPosts(query) {
    // let Posts = []
    return await getContent(query).then(items => {
        console.log(items);
        return [...items]
    }).catch((error) => {
        console.log(error);
    })
}

function ShowPost({ post }) {
    return (
        <div>
            {
                post.map((singlePost) => {
                    return <Post key={'post-' + singlePost.id} post={singlePost} user={getUserDetails(singlePost.UserId)} />
                })
            }
        </div>
    )
}

function NewsFeed() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts(api.posts).then((res) => {
            setPosts(res)
        })
    }, [])


    return (
        <div className="news-feed-wrapper">
            <h2>Welcome back!</h2>

            <NewPost />
            <ShowPost post={posts} />

            {/* <Post likes='24' />
            <Post likes='14' />
            <Post likes='124' /> */}
        </div>

    )
}

export default NewsFeed