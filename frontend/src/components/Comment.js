import { api, getUserDetails, appUrl } from '../main';
import { useEffect, useState } from 'react';
import Button from './Button';
import '../styles/Comment.css';

function Comment({ comment, media, user }) {
    const [userDetails, setUsers] = useState([]);
    useEffect(() => {
        getUserDetails(api.users + '/' + user).then((res) => {
            setUsers(res)
        })
        //TODO:   Line 18:8:  React Hook useEffect has a missing dependency: 'user'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="comment-wrapper">
            <div className="comment">
                <div className="comment-details">
                    <div className="comment-details__user-picture">
                        {/*TODO: add profile picture handling*/}
                        <a className="link" href={appUrl + 'user/' + comment.UserId}><img src={require('../media/default-picture.png').default} alt={userDetails.firstName + ' ' + userDetails.secondName + "'s profile picture"} /></a></div>
                    <div className="comment-details__user-name">
                        <a className="link" href={appUrl + 'user/' + comment.UserId}>{userDetails.firstName + ' ' + userDetails.secondName}</a>
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