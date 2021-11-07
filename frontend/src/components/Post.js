import LikeBar from './LikeBar';
import Button from './Button';
import Comment from './Comment.js';
import NewComment from './NewComment.js';
// import { api } from '../main'
import '../styles/Post.css';


function Post({ post, user }) {

    return (
        <div className="post-wrapper">
            <div className="post">
                <div className="post-section">
                    <div className="post-details">
                        <div className="post-details__user-picture">
                            <img src={require('../media/default-picture.png').default} alt="profile" />
                        </div>
                        {/* <div className="post-details__title">Post Title</div> */}
                        <div className="post-details__title">{post.postTitle}</div>
                        <div className="post-details__user-name">User ID : {user}</div>

                    </div>
                    <div className="post-details-dates">
                        <div className="post-details__created-at">Post Created: {post.createdAt}</div>
                        <div className="post-details__last-modified">Last Modified: {post.createdAt !== post.updatedAt ? post.updatedAt : null}</div>
                    </div>
                    {/* {post.media !== "empty" ? (<div className="post__media">
                        <img src={require(post.media).default} alt={'tablet'} />
                    </div>) : null} */}

                    <div className="post__content">{post.postContent}</div>
                    <Button className="delete" buttonContent="Delete Post" />
                </div>
                <LikeBar likes={post.Likes.length} />

            </div>
            <div className="comment-section">
                <NewComment />
                <Comment media={require('../media/emoji.png').default} />
                <Comment />
                <Comment />
                <Comment />

            </div>
        </div>
    )
}

export default Post