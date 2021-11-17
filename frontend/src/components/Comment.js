import { appUrl } from '../main';
import Button from './Button';
import '../styles/Comment.css';

function Comment({ comment, media, user }) {


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
            <Button className="delete delete-comment" buttonContent="Delete Comment" />
            <Button className="edit edit-comment" buttonContent="Edit Comment" />
        </div>
    )
}

export default Comment