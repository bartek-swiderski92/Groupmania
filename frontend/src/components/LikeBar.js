import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiUrl } from '../main';
import '../styles/LikeBar.css'
import Button from './Button';


function LikeBar({ likes, postId }) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

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
        if (likesArr.indexOf(parseInt(userId)) > -1) { return true } else { return false }
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

    function removeLike(event) {
        event.preventDefault();
        console.log('removing')
    }

    return (
        <div className="like-bar">
            {(() => isLiked() ? (<Button onClick={removeLike} className="liked" buttonContent="Liked!" />
            ) : (<Button onClick={submitLike} className="like" buttonContent="Like" />
            ))()}
            <span className="like-bar__number">{(() => {
                if (likes.length === 0) {
                    return 'Be first to like it!'
                } else if (likes.length === 1) {
                    return 'One Person likes it!'
                } else {
                    return likes.length + ' people like it!'
                }
            })()}</span>
            {/* <button onClick={() => console.log(likesArr)}>Click</button> */}
        </div>
    )
}

export default LikeBar