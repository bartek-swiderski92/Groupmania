import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiUrl } from '../main';
import '../styles/LikeBar.css'
import Button from './Button';

function LikeBar({ postId, checkIfPostIsRead, markAsRead, markAsUnread, readPost }) {
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
        // eslint-disable-next-line
    }, [liked])

    function submitLike() {
        axios.post(`${apiUrl}/likes`,
            { "postId": postId },
            {
                headers: {
                    "Authorization": `Bearer: ${token}`
                }
            })
            .then(() =>
                setLiked(true)
            )
            .catch(err => {
                if (err.status.data === 403) {

                }
            })
    }

    function removeLike() {
        axios.delete(`${apiUrl}/likes/${postId}`, {
            headers:
            {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then(() =>
                setLiked(false)
            )
            .catch(err => console.log(err.response.status))
    }

    function displayLikes(array) {
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
            <div>
                {liked ? (<Button onClick={removeLike} className="liked" buttonContent="Liked!" />
                ) : (<Button onClick={submitLike} className="like" buttonContent="Like" />
                )}
                <span id="likes-span" className="like-bar__number">{displayLikes(likesArr)}</span>

            </div>
            <div>
                {readPost ? (
                    <button onClick={markAsUnread} className={'read'} >Mark as unread</button>
                ) : (
                    <button onClick={markAsRead} className={'read'} >Mark as read</button>

                )}

            </div>
        </div>
    )
}

export default LikeBar