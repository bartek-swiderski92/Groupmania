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
                const localLikesArr = res.data.map(el => el.UserId)
                if (localLikesArr.indexOf(parseInt(userId)) >= 0) {
                    setLiked(true)
                } else {
                    setLiked(false)
                }
                setLikesArr(localLikesArr)
                displayLikes(localLikesArr)
            })
            .catch(err => { console.log(err) })
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

    function displayLikes(array) {
        const likeSpan = document.querySelector('#likes-span')
        if (array.length === 0) {
            return 'Be first to like it!'
        } else if (array.length === 1) {
            return 'One Person likes it!'
        } else {
            return array.length + ' people like it!'
        }
    }

    return (
        <div className="like-bar">
            {liked ? (<Button onClick={removeLike} className="liked" buttonContent="Liked!" />
            ) : (<Button onClick={submitLike} className="like" buttonContent="Like" />
            )}
            <span id="likes-span" className="like-bar__number">{displayLikes(likesArr)}</span>
            {/* <button onClick={() => console.log(likesArr)}>Click</button> */}
        </div>
    )
}

export default LikeBar