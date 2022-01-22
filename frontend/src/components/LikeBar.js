import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiUrl } from '../main';
import '../styles/LikeBar.css'
import Button from './Button';

function LikeBar({ likes, postId }) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [likesArr, setLikesArr] = useState([]);
    const [liked, setLiked] = useState();
    useEffect(() => {
        axios.get(`${apiUrl}/likes/${postId}`)
            .then(res => {
                setLikesArr(res.data.map(el => el.UserId))
            })
            .catch(err => { console.log(err) })
            .then(() => {
                // console.log(likesArr.indexOf(parseInt(userId)))
                // console.log(likesArr);
                if (likesArr.indexOf(parseInt(userId)) >= 0) { setLiked(true) } else {
                    setLiked(false)
                }
                // console.log(liked)
            })
    }, [liked])

    function submitLike() {
        axios.post(`${apiUrl}/likes`,
            { "postId": postId },
            {
                headers: {
                    "Authorization": `Bearer: ${token}`
                }
            })
            .then()
            .catch(err => {
                window.alert(err)
            })
        setLiked(true)
    }

    function removeLike() {
        axios.delete(`${apiUrl}/likes/${postId}`, {
            headers:
            {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then()
            .catch(err => console.log(err))
        setLiked(false)
    }

    return (
        <div className="like-bar">
            {liked ? (<Button onClick={removeLike} className="liked" buttonContent="Liked!" />
            ) : (<Button onClick={submitLike} className="like" buttonContent="Like" />
            )}
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