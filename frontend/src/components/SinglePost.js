import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


import { api, getPosts, ShowPost } from '../main';


function SinglePost(props) {
    const history = useHistory();

    const [post, setPosts] = useState([]);
    useEffect(() => {
        getPosts(api.posts + '/' + document.URL.split('/')[4]).then((res) => {
            setPosts(res)
        })
    }, [])
    console.log('singlepost', props.userLoggedIn);
    if (props.userLoggedIn !== true) {
        history.pushState('/login')
    }

    return <ShowPost post={post} displayLikes={true} displayComments={true} />
}

export default SinglePost;