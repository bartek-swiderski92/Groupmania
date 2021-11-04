import LikeBar from './LikeBar';
import Comment from './Comment.js';
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
                    <div className="post__media">
                        <img src={require('../media/photo.jpg').default} alt={'tablet'} />
                    </div>
                    <div className="post__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ipsam, quia aspernatur quis asperiores id. Perferendis unde modi, maiores, dicta possimus ducimus ipsa neque, nostrum aliquam provident aperiam eum magnam dolorem id? Beatae id tempore iure sed voluptatum similique veniam inventore quia eos adipisci, repellendus, deleniti, explicabo accusamus harum porro!</div>
                </div>
                <LikeBar likes={likes} />

            </div>
            <div className="comment-section">
                <Comment media={require('../media/emoji.png').default} />
                <Comment />
                <Comment />
                <Comment />

            </div>
        </div>
    )
}

export default Post