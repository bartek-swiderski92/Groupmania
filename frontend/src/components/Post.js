import LikeBar from './LikeBar';
import Button from './Button';
import Comment from './Comment.js';
import NewComment from './NewComment.js';
// import { api } from '../main'
import '../styles/Post.css';


function Post({ likes }) {

    return (
        <div className="post-wrapper">
            <div className="post">
                <div className="post-section">
                    <div className="post-details">
                        <div className="post-details__user-picture">
                            <img src={require('../media/default-picture.png').default} alt="profile" />
                        </div>
                        <div className="post-details__title">Post Title</div>
                        <div className="post-details__user-name">John Doe</div>

                    </div>
                    <div className="post-details-dates">
                        <div className="post-details__created-at">Post Created: {new Date().toLocaleDateString()}</div>
                        <div className="post-details__last-modified">Last Modified: {new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="post__media">
                        <img src={require('../media/photo.jpg').default} alt={'tablet'} />
                    </div>
                    <div className="post__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ipsam, quia aspernatur quis asperiores id. Perferendis unde modi, maiores, dicta possimus ducimus ipsa neque, nostrum aliquam provident aperiam eum magnam dolorem id? Beatae id tempore iure sed voluptatum similique veniam inventore quia eos adipisci, repellendus, deleniti, explicabo accusamus harum porro!</div>
                    <Button className="delete" buttonContent="Delete Post" />
                </div>
                <LikeBar likes={likes} />

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