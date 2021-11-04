import Button from './Button';
import '../styles/Post.css';
function Post() {
    return (
        <div className="wrapper">
            <div className="post">
                <div className="post-section">
                    <div className="post__details">
                        <div className="post__user-picture">
                            <img src={require('../media/default-picture.png').default} alt="profile" />
                        </div>
                        <div className="post__user-name">John Doe</div>
                        <div className="post__title">Post Title</div>
                    </div>
                    <div className="post__media">
                        <img src={require('../media/photo.jpg').default} alt={'tablet'} />
                    </div>
                    <div className="post__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ipsam, quia aspernatur quis asperiores id. Perferendis unde modi, maiores, dicta possimus ducimus ipsa neque, nostrum aliquam provident aperiam eum magnam dolorem id? Beatae id tempore iure sed voluptatum similique veniam inventore quia eos adipisci, repellendus, deleniti, explicabo accusamus harum porro!</div>
                </div>

                <div className="like-bar">
                    <Button className="like" buttonContent="Like!" />
                    <span className="like-bar__number">54 People Like it!</span>
                </div>

                <div className="comment-section">
                    <div className="comment">
                        <div className="comment__user-picture">
                            <img src={require('../media/default-picture.png').default} alt="profile" />
                        </div>
                        <div className="comment__structure">
                            <div className="comment__user-name">
                                Jane Smith
                            </div>
                            <div className="comment__content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum aspernatur eveniet non exercitationem quas itaque illo recusandae impedit aliquam dicta.
                            </div>
                            <div className="like-bar">
                                {/* <button className="like-bar__btn">Like</button>  */}
                                <Button />
                                <span className="like-bar__number">23 People Like it!</span>
                            </div>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="comment__user-picture">
                            <img src={require('../media/default-picture.png').default} alt="profile" />
                        </div>
                        <div className="comment__structure">
                            <div className="comment__user-name">
                                Jane Smith
                            </div>
                            <div className="comment__content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum aspernatur eveniet non exercitationem quas itaque illo recusandae impedit aliquam dicta.
                            </div>
                            <div className="like-bar">
                                {/* <button className="like-bar__btn">Like</button> <span 
                                className="like-bar__number">23 People Like it!</span> */}
                                <Button />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Post