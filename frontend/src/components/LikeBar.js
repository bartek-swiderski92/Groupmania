import '../styles/LikeBar.css'
import Button from './Button';


function LikeBar({ likes }) {
    return (
        <div className="like-bar">
            <Button className="like" buttonContent="Like!" />
            {/* <span className="like-bar__number">{likes ? likes + ' People like it!' : 'Be first to like it!'}</span> */}
            <span className="like-bar__number">{(() => {
                if (!likes) {
                    return 'Be first to like it!'
                } else if (likes === 1) {
                    return 'One Person likes it!'
                } else {
                    return likes + ' people like it!'
                }
            })()}</span>
        </div>
    )
}

export default LikeBar