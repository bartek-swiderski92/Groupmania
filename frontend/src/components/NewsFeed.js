import Post from './Post';
import { api, getContent } from '../main';

import '../styles/NewsFeed.css';

function NewsFeed() {

    async function getPosts(query) {
        await getContent(query).then(item => {
            console.log(item)
        })
    }
    getPosts(api.posts)
    return (
        <>
            <Post likes='24' />
            <Post likes='14' />
            <Post likes='124' />
        </>
    )
}

export default NewsFeed