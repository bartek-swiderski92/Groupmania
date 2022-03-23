import axios from 'axios';

import { apiUrl } from '../main';

import '../styles/NewComment.css';
import Button from './Button';

function NewComment({ postId, refreshComponent }) {
    //FIX: comment content not passing 
    //FIX: refreshing post after inserting a comment
    //TODO: investigate picture error while removign comment content
    function loadImagePreview(event) {
        const output = document.querySelector(`#new-comment__image-${postId}`)
        if (event && event.target.files[0]) {
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
    function submitComment(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const [commentContent, commentMedia] = event.target.elements

        let formData = new FormData();
        formData.append('postId', postId);
        formData.append('commentContent', commentContent.value);
        formData.append('image', event.target[1].files[0]);

        axios.post(`${apiUrl}/comments/`, formData, {
            headers: {
                "Authorization": `Bearer: ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                const output = document.querySelector(`#new-comment-image-${postId}`)
                commentContent.value = '';
                commentMedia.value = '';
                output.style.display = 'none'
                window.alert(res.data.message);

                refreshComponent()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="new-comment-wrapper">
            <form action="create-comment" className="comment-body" onSubmit={submitComment} encType="multipart/form-data">
                <h2 className="new-comment__heading">Comment the post</h2>
                <textarea className="new-comment__input" name="newComment" id="newComment" placeholder="Insert your comment here..."></textarea>
                <img id={`new-comment__image-${postId}`} alt="media preview" style={{ display: 'none' }} className="new-comment__image-preview" />
                <input onChange={loadImagePreview} type="file" id={`image-url-new-post-${postId}`} className="new-post-input" accept='image/*' />

                <Button className="new-comment__button" buttonContent="Create a comment" />
            </form>
        </div>
    )
}

export default NewComment;