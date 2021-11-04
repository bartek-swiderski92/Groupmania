import '../styles/LikeBar.css'
import Button from './Button';


function LikeBar({ likes }) {
    return (
        <div className="like-bar">
            <Button className="like" buttonContent="Like!" />
            <span className="like-bar__number">{likes ? likes + ' People like it!' : 'Be first to like it!'}</span>
        </div>
    )
}

export default LikeBar