import '../styles/NewPost.css'
import Button from './Button'

function NewPost() {
    function attachImage(e) {
        e.preventDefault();
        console.log('attaching');
    }
    function submitPost(e) {
        e.preventDefault();
        console.log('submitting');
    }

    return (
        <div className="new-post-component">
            <h3>Tell us what's on your mind today!</h3>
            <form action="create-post" className="post-body">
                <input type="text" id="post-title" placeholder="Post Title" className="new-post-input" />
                <textarea placeholder="Post Content" className="new-post-input" />
                <Button onClick={attachImage} buttonContent='Click here to add a picture' className='new-post' />
                <input type="text" id="image-url" placeholder="Image path..." className="new-post-input" />
                <Button onClick={submitPost} buttonContent='Add Post' className='new-post' />
            </form>

        </div>
    )
}

export default NewPost