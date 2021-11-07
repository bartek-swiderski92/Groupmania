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
        <div className="new-post-wrapper">
            <h3>Tell us what's on your mind today!</h3>
            <form action="create-post" className="post-body">
                <input type="text" id="post-title" placeholder="Post Title" className="new-post-input" />
                <textarea placeholder="Post Content" className="new-post-input" />
                <input type="file" id="image-url-new-post" placeholder="Image path..." className="new-post-input"/>
                {/* <Button type="file" className='new-post__button' onClick={attachImage} buttonContent='Click here to add a picture' /> */}
                <Button className='new-post__button' onClick={submitPost} buttonContent='Add Post' />
            </form>

        </div>
    )
}

export default NewPost