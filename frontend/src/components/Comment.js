import LikeBar from './LikeBar';
import '../styles/Comment.css';

function Comment() {
    return (
        <div className="comment-wrapper">
            <div className="comment">
                <div className="comment-details">
                    <div className="comment-details__user-picture">
                        <img src={require('../media/default-picture.png').default} alt="profile" />
                    </div>
                    <div className="comment-details__user-name">
                        Jane Smith
                    </div>
                </div>
                <div className="comment__content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum aspernatur eveniet non exercitationem quas itaque illo recusandae impedit aliquam dicta.
                </div>

            </div>
            <LikeBar />
        </div>
    )
}

export default Comment