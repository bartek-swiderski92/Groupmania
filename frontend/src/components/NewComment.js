import '../styles/NewComment.css';
import Button from './Button';

function NewComment() {
    return (
        <div className="new-comment-wrapper">
            <h2 className="new-comment__header">Comment the post</h2>
            <textarea className="new-comment__input" name="newComment" id="newComment" placeholder="Insert your comment here..."></textarea>
            <input className="new-comment__input" id="image-url-new-comment" type="text" placeholder="Image Path..." />
            <Button className="new-comment__button" buttonContent="Attach Image" />
            <Button className="new-comment__button" buttonContent="Create a comment" />
        </div>
    )
}

export default NewComment;