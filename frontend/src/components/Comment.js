import axios from 'axios';

import { apiUrl, appUrl } from '../main';
import Button from './Button';
import '../styles/Comment.css';
import '../styles/NewComment.css';

function Comment({ comment, media, refreshComponent }) {

    const token = localStorage.getItem('token');
    function deleteComment() {
        if (window.confirm("Are you sure you want to delete this comment?") === true) {
            console.log(comment.id)
            axios.delete(`${apiUrl}/comments/${comment.id}`, {
                headers: {
                    "Authorization": `Bearer: ${token}`
                }
            })
                .then(res => {
                    console.log(res)
                    refreshComponent()

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    function displayEdit(editable) {
        const commentContentEl = document.querySelector(`#comment-content-${comment.id}`)
        const editCommentEl = document.querySelector(`#edit-comment-${comment.id}`)
        const deleteBtn = document.querySelector(`#delete-btn-${comment.id}`)
        const editBtn = document.querySelector(`#edit-btn-${comment.id}`)

        if (editable === true) {
            commentContentEl.style.display = "none"
            editCommentEl.style.display = "block"
            deleteBtn.disabled = true
            editBtn.disabled = true
            deleteBtn.className = 'disabled'
            editBtn.className = 'disabled'
        } else {
            commentContentEl.style.display = "block"
            editCommentEl.style.display = "none"
            deleteBtn.disabled = false
            editBtn.disabled = false
            deleteBtn.className = 'delete delete-comment'
            editBtn.className = 'edit edit-comment'
        }
    }

    function submitComment(event) {
        event.preventDefault();
        displayEdit(false);
        const token = localStorage.getItem('token');
        const [commentContent, commentMedia] = event.target.elements;
        axios.put(`${apiUrl}/comments/${comment.id}`, {
            "commentContent": commentContent.value,
            "media": commentMedia.value
        }, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then(() => {
                refreshComponent()
            })
            .catch(err => {
                console.log(err)

            })
    }

    return (
        <div className="comment-wrapper">
            <div className="comment">
                <div className="comment-details">
                    <div className="comment-details__user-picture">
                        {/*TODO: add profile picture handling*/}
                        <a className="link" href={appUrl + 'user/' + comment.UserId}><img src={require('../media/default-picture.png').default} alt={comment.User.firstName + ' ' + comment.User.secondName + "'s profile picture"} /></a></div>
                    <div className="comment-details__user-name">
                        <a className="link" href={appUrl + 'user/' + comment.UserId}>{comment.User.firstName + ' ' + comment.User.secondName}</a>
                    </div>
                </div>
                <div className="comment-content">
                    {/*TODO: add media handling*/}
                    {comment.media ? (<div className="comment-content__media">
                        <img src={comment.media} alt={comment.media} />
                    </div>) : (null)
                    }
                    <div className="comment-content__text" id={`comment-content-${comment.id}`}>
                        {comment.commentContent}
                    </div>
                    <form action="create-comment" className="edit-comment--body" id={`edit-comment-${comment.id}`} onSubmit={submitComment} style={{ display: "none" }}>
                        <textarea className="new-comment__input" name="newComment" id="newComment" defaultValue={comment.commentContent}>
                        </textarea>
                        <input type="file" id="image-url-new-post" className="new-post-input" />
                        <Button type="submit" className="submit" buttonContent="Save" />
                        <Button type="reset" onClick={() => displayEdit(false)} className="delete" buttonContent="Cancel" />
                    </form>
                </div>
            </div>
            
            <div>
                {(() => {
                    if (parseInt(localStorage.getItem('userId')) === comment.UserId) {
                        return (<>
                            <Button onClick={deleteComment} className="delete delete-comment" buttonContent="Delete Comment" id={`delete-btn-${comment.id}`} />
                            <Button onClick={() => displayEdit(true)} className="edit edit-comment" buttonContent="Edit Comment" id={`edit-btn-${comment.id}`} />
                        </>
                        )
                    }
                })()}

            </div>
        </div >
    )
}

export default Comment