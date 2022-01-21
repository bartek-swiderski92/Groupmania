import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiUrl } from '../main';
import '../styles/LikeBar.css'
import Button from './Button';


function LikeBar({ likes, postId }) {
    const token = localStorage.getItem('token');

    const [likesArr, setLikesArr] = useState([]);
    useEffect(() => {
        axios.get(`${apiUrl}/likes/${postId}`)
            .then(res => {
                setLikesArr(res.data.map(el => el.UserId))
            })
            .catch(err => { console.log(err) })
    }, [likes, postId])
    // console.log(likesArr)

    function isLiked() {
        //     const userId = localStorage.getItem('userId');
        //     if (getLikes.indexOf(parseInt(userId)) > -1) { return true } else { return false }
        return true
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
            <button onClick={() => console.log(likesArr)}>Click</button>
        </div>
    )
}

export default LikeBar