import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { apiUrl } from '../main';

import '../styles/NewComment.css';
import Button from './Button';

function NewComment({ postId, refreshComponent }) {

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
                window.alert(res.data.message);
                commentContent.value = '';
                commentMedia.value = '';
                refreshComponent()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="new-comment-wrapper">
            <form action="create-comment" className="comment-body" onSubmit={submitComment} encType="multipart/form-data">
                <h2 className="new-comment__heading">Comment the post</h2>
                <textarea className="new-comment__input" name="newComment" id="newComment" placeholder="Insert your comment here..."></textarea>
                <input type="file" id="image-url-new-post" className="new-post-input" accept='image/*' />
                <Button className="new-comment__button" buttonContent="Create a comment" />
            </form>
        </div>
    )
}

export default NewComment;