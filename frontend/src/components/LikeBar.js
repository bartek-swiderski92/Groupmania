import { useEffect, useState } from 'react';
import axios from 'axios';

import { api, apiUrl, getPosts } from '../main';
import '../styles/LikeBar.css'
import Button from './Button';


function LikeBar({ likes }) {
    const [getLikes, setLikes] = useState([]);
    useEffect(() => {
        setLikes(likes.map(like => like.id))
    }, [likes])

    function checkIfUserLikes() {
        const userId = localStorage.getItem('userId');
        if (getLikes.indexOf(parseInt(userId)) >= 0) { return true } else { return false }
    }
    console.log(checkIfUserLikes())

    function submitLike(event) {
        event.preventDefault();
        console.log('submitting like');
        axios.post({})
    }

    return (
        <div className="like-bar">
            <Button onClick={submitLike} className="like" buttonContent="Like!" />
            {/* <span className="like-bar__number">{likes ? likes + ' People like it!' : 'Be first to like it!'}</span> */}
            <span className="like-bar__number">{(() => {
                if (!likes) {
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