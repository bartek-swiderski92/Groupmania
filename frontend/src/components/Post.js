import { appUrl } from '../main';
import LikeBar from './LikeBar';
import Button from './Button';
import Comment from './Comment.js';
import NewComment from './NewComment.js';
import '../styles/Post.css';
import '../styles/Main.css';

function Post({ post, user, displayLikes, displayComments }) {

    return (
        <div className="post-wrapper">
            <div className="post">
                <div className="post-section">
                    <div className="post-details">
                        <div className="post-details__user-picture">
                            <a className="link" href={appUrl + 'user/' + post.UserId}><img src={require('../media/default-picture.png').default} alt={(post.User ? post.User.firstName : user.firstName) + ' ' + (post.User ?post.User.secondName : user.secondName) + "'s profile picture"} /></a>

                        </div>
                        {/* <div className="post-details__title">Post Title</div> */}
                        <div className="post-details__info-div">
                            <h2 className="post-details__title"><a className="link" href={appUrl + 'post/' + post.id}>{post.postTitle}</a></h2>
                            <h3 className="post-details__user-name"><a className="link" href={appUrl + 'user/' + (post.User ? post.User.firstName : user.firstName) + ' ' + (post.User ?post.User.secondName : user.secondName) }></a></h3>
                        </div>

                    </div>
                    <div className="post-details-dates">
                        <div className="post-details__created-at">Post Created: {post.createdAt}</div>
                        {post.createdAt !== post.updatedAt ? <div className="post-details__last-modified">Last Modified: {post.updatedAt}</div> : null}

                    </div>
                    {/* {post.media !== "empty" ? (<div className="post__media">
                        <img src={require(post.media).default} alt={'tablet'} />
                    </div>) : null} */}

                    <div className="post__content">{post.postContent}</div>
                    <Button className="delete" buttonContent="Delete Post" />
                    <Button className="edit" buttonContent="Edit Post" />
                </div>
                {displayLikes ? <LikeBar likes={post.Likes.length} /> : null}


            </div>
            {displayComments ? (<div className="comment-section">
                <NewComment />
                {post.Comments.map((comment) => (
                    <Comment key={'comment-' + comment.id} comment={comment} user={post.User} />
                ))}
            </div>) : null}

        </div>
    )
}

export default Post