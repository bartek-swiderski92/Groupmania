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
    // const [amountOfComments, setAmountOfComments] = useState(post.Comments.length);


    // function refreshComponent() {
    //     console.log('state in function', amountOfComments)
    //     setAmountOfComments(post.Comments.length + 1)
    //     console.log('after setting up the state', amountOfComments);
    // }

    if (props.userLoggedIn !== true) {
        history.pushState('/login')
    }

    return <ShowPost post={post} displayLikes={true} displayComments={true} />
}

export default SinglePost;