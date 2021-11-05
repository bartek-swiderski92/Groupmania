import '../styles/NewPost.css'
import Button from './Button'

function NewPost() {
    return (
        <div className="new-post-component">
            <h3>Tell us what's on your mind today!</h3>
            <form action="create-post" className="post-body">
                <input type="text" id="post-title" placeholder="Post Title" className="new-post-input"/>
                <textarea placeholder="Post Content" className="new-post-input"/>
                <Button buttonContent='Click here to add a picture' className='new-post' />
                <Button buttonContent='Add Post' className='new-post' />
            </form>

        </div>
    )
}

export default NewPost