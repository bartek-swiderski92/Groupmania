import { api, getPosts, ShowPost } from '../main';
import { useEffect, useState } from 'react';


function SinglePost() {
    const [post, setPosts] = useState([]);
    useEffect(() => {
        getPosts(api.posts + '/' + document.URL.split('/')[4]).then((res) => {
            setPosts(res)
        })
    }, [])

    return <ShowPost post={post} displayLikes={true} displayComments={true} />
}

export default SinglePost;