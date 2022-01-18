import axios from 'axios';

import { apiUrl, appUrl } from '../main';
import Button from './Button';
import '../styles/Comment.css';

function Comment({ comment, media, user }) {
    const token = localStorage.getItem('token');
    function deleteComment() {
        if (window.confirm("Are you sure you want to delete this post?") === true) {
            console.log(comment.id)
            axios.delete(`${apiUrl}/comments/${comment.id}`, {
                headers: {
                    "Authorization": `Bearer: ${token}`
                }
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log('not')
        }
    }

    return (
        <div className="comment-wrapper">
            <div className="comment">
                <div className="comment-details">
                    <div className="comment-details__user-picture">
                        {/*TODO: add profile picture handling*/}
                        <a className="link" href={appUrl + 'user/' + comment.UserId}><img src={require('../media/default-picture.png').default} alt={user.firstName + ' ' + user.secondName + "'s profile picture"} /></a></div>
                    <div className="comment-details__user-name">
                        <a className="link" href={appUrl + 'user/' + comment.UserId}>{user.firstName + ' ' + user.secondName}</a>
                    </div>
                </div>
                <div className="comment-content">
                    {/*TODO: add media handling*/}
                    {comment.media ? (<div className="comment-content__media">
                        <img src={comment.media} alt={comment.media} />
                    </div>) : (null)
                    }
                    <div className="comment-content__text">
                        {comment.commentContent}
                    </div>
                </div>

            </div>
            <div>
                {(() => {
                    if (localStorage.getItem('userId') == user.id) {
                        return (<>
                            <Button onClick={deleteComment} className="delete delete-comment" buttonContent="Delete Comment" />
                            <Button className="edit edit-comment" buttonContent="Edit Comment" />
                        </>
                        )
                    }
                })()}

            </div>
        </div>
    )
}

export default Comment