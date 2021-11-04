import Post from './Post';
import { api, getContent } from '../main';

import '../styles/NewsFeed.css';

function NewsFeed() {
    let Posts = []
    async function getPosts(query) {
        await getContent(query).then(items => {
            Posts = [...items]
            console.log(Posts);
        }).catch((error) => {
            console.log(error);
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