import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { apiUrl } from '../main';

import '../styles/NewComment.css';
import Button from './Button';

function NewComment({ postId, refreshComponent }) {
    const history = useHistory();

    function submitComment(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const [commentContent, commentMedia] = event.target.elements
        console.log(postId)
        axios.post(`${apiUrl}/comments/`, {
            "postId": postId,
            "commentContent": commentContent.value,
            "media": commentMedia.value,
        }, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then(res => {
                window.alert(res.data.message)
                // debugger
                if (window.location.href.includes(`/post/${postId}`)) {
                    refreshComponent()
                } else {
                    history.push(`/post/${postId}`)
                }
            })
            .catch(err => console.log(err))
    }
    //TODO: update comment array in order to re-render

    return (
        <div className="new-comment-wrapper">
            <form action="create-comment" className="comment-body" onSubmit={submitComment}>
                <h2 className="new-comment__header">Comment the post</h2>
                <textarea className="new-comment__input" name="newComment" id="newComment" placeholder="Insert your comment here..."></textarea>
                <input type="file" id="image-url-new-post" className="new-post-input" />
                <Button className="new-comment__button" buttonContent="Create a comment" />
            </form>
        </div>
    )
}

export default NewComment;