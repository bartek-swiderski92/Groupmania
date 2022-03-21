import { useState } from 'react';

import axios from 'axios';

import { apiUrl, appUrl } from '../main';
import Button from './Button';
import '../styles/Comment.css';
import '../styles/NewComment.css';

function Comment({ comment, refreshComponent }) {
    const token = localStorage.getItem('token');
    const [deletePictureFlag, setDeletePictureFlag] = useState(false)
    // TODO: check the file upload and cancellation
    function loadImagePreview(event) {
        const output = document.querySelector(`#comment__media-${comment.id}`)
        if (event && event.target.files[0]) {
            console.log('if');
            event.preventDefault();
            output.src = URL.createObjectURL(event.target.files[0]);
            output.style.display = 'block'
            output.onload = function () {
                URL.revokeObjectURL(output.src)
            };
        } else if (!event?.target.files[0]) {
            console.log('else')
            output.style.display = 'none'

        }
    };

    function dltComment() { // Method deleting Comment from DB 
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

    function dltPicture() { // deletes picture file from back-end
        axios.delete(`${apiUrl}/comments/picture/` + comment.id, {
            headers: {
                "Authorization": `Bearer: ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            console.log(res.data.message)
        })
            .catch(err => {
                console.log(err)
            })
    }

    function deleteCommentWithPicture() {
        axios.delete(`${apiUrl}/comments/picture/` + comment.id, {
            headers: {
                "Authorization": `Bearer: ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            console.log(res.data.message)
            dltComment()
        })
            .catch(err => {
                console.log(err)
            })
    }

    function deleteComment() { // Deletes media if any, then runs dltComment
        if (window.confirm("Are you sure you want to delete this comment?") === true) {
            if (comment.media !== null) {
                deleteCommentWithPicture()
            } else {
                dltComment()
            }
        }
    }

    function displayEdit(editable) {
        const commentContentEl = document.querySelector(`#comment-content-${comment.id}`)
        const editCommentEl = document.querySelector(`#edit-comment-${comment.id}`)
        const deleteBtn = document.querySelector(`#delete-btn-${comment.id}`)
        const editBtn = document.querySelector(`#edit-btn-${comment.id}`)
        const imagePreview = document.querySelector(`#comment__media-${comment.id}`)

        if (editable === true) {
            commentContentEl.style.display = "none"
            editCommentEl.style.display = "block"
            deleteBtn.disabled = true
            editBtn.disabled = true
            deleteBtn.className = 'disabled'
            editBtn.className = 'disabled'
        } else {
            hideOldPicture()
            imagePreview.src = comment.media
            commentContentEl.style.display = "block"
            editCommentEl.style.display = "none"
            deleteBtn.disabled = false
            editBtn.disabled = false
            deleteBtn.className = 'delete delete-comment'
            editBtn.className = 'edit edit-comment'
        }
    }

    function hideOldPicture(value, event) {
        const image = document.querySelector(`#comment__media-${comment.id}`)
        const imageINput = document.querySelector(`#image-url-new-post-${comment.id}`)
        if (!image) {
            loadImagePreview(event)
            return
        }
        setDeletePictureFlag(true);
        if (value === 'remove') {
            imageINput.value = null
            image.style.display = 'none'
        } else if (value === 'replace') {
            loadImagePreview(event)
        } else {
            loadImagePreview(event)
            image.style.display = 'inline'
        }
    }

    function editComment(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        displayEdit(false);
        if (deletePictureFlag) {
            dltPicture()
        }
        let formData = new FormData();
        formData.append('postTitle', event.target.elements[0].value)
        formData.append('image', event.target[1].files[0])
        axios.put(`${apiUrl}/comments/${comment.id}`, formData, {
            headers: {
                "Authorization": `Bearer: ${token}`,
                "Content-Type": "multipart/form-data"
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
                        <a className="link" href={appUrl + 'user/' + comment.UserId}><img src={require('../media/default-picture.png').default} alt={comment.User.firstName + ' ' + comment.User.secondName + "'s profile picture"} /></a></div>
                    <div className="comment-details__user-name">
                        <a className="link" href={appUrl + 'user/' + comment.UserId}>{comment.User.firstName + ' ' + comment.User.secondName}</a>
                    </div>
                </div>
                <div className="comment-content">
                    <div className="comment__media" >
                        <img src={comment.media} alt={'tablet'} id={`comment__media-${comment.id}`} style={comment.media === null ? { display: 'none' } : { display: 'inline' }} />
                    </div>
                    <div className="comment-content__text" id={`comment-content-${comment.id}`}>
                        {comment.commentContent}
                    </div>
                    <form action="create-comment" className="edit-comment--body" id={`edit-comment-${comment.id}`} onSubmit={editComment} style={{ display: "none" }}>
                        <textarea className="new-comment__input" name="newComment" id="newComment" defaultValue={comment.commentContent}>
                        </textarea>
                        <input onChange={(event) => {
                            hideOldPicture('replace', event);
                        }} type="file" accept='image/*' id={`image-url-new-post-${comment.id}`} className="new-post-input" />
                        <img id={`output-comment-${comment.id}`} alt="media preview" style={{ display: 'none' }} />
                        <Button type="button" onClick={(event) => { hideOldPicture('remove', event) }} className="delete" buttonContent="Remove Image" />
                        <Button type="reset" onClick={() => displayEdit(false)} className="delete" buttonContent="Cancel" />
                        <Button type="submit" className="submit" buttonContent="Save" />
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