import { useEffect, useState } from 'react';
import axios from 'axios';

import { api, apiUrl, getPosts } from '../main';
import '../styles/LikeBar.css'
import Button from './Button';


function LikeBar({ likes, postId }) {
    const token = localStorage.getItem('token');

    

    const [getLikes, setLikes] = useState([]);
    useEffect(() => {
        setLikes(likes.map(like => like.id))
    }, [likes])

    function isLiked() {
        const userId = localStorage.getItem('userId');
        if (getLikes.indexOf(parseInt(userId)) > -1) { return true } else { return false }
    }

    function submitLike(event) {
        event.preventDefault();
        console.log('submitting like');
        axios.post(`${apiUrl}/likes`,
            { "postId": postId },
            {
                headers: {
                    "Authorization": `Bearer: ${token}`
                }
            })
            .then(res => {
                console.log(res)
            })
    }
    console.log(likes)
    return (
        <div className="like-bar">
            <Button onClick={submitLike} className={isLiked() ? "liked" : "like"} buttonContent={isLiked() ? "Liked!" : "Like"} />
            {/* <span className="like-bar__number">{likes ? likes + ' People like it!' : 'Be first to like it!'}</span> */}
            <span className="like-bar__number">{(() => {
                if (likes.length === 0) {
                    return 'Be first to like it!'
                } else if (likes.length === 1) {
                    return 'One Person likes it!'
                } else {
                    return likes.length + ' people like it!'
                }
            })()}</span>
        </div>
    )
}

export default LikeBar