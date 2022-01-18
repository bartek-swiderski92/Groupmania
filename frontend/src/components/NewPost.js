import axios from 'axios';
import { apiUrl } from '../main';
import { useHistory } from 'react-router-dom';

import Button from './Button'
import '../styles/NewPost.css'

function NewPost() {

    const history = useHistory();
    // function attachImage(e) {
    //     e.preventDefault();
    //     console.log('attaching');
    // }
    function submitPost(event) {
        const token = localStorage.getItem('token');
        event.preventDefault();
        const [postTitle, postContent, postMedia] = event.target.elements;
        axios.post(`${apiUrl}/posts`, {
            "postTitle": postTitle.value,
            "postContent": postContent.value,
            "media": postMedia.value
        }, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then(res => {
                window.alert(res.data.message)
                history.push(`/post/${res.data.post.id}`)
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="new-post-wrapper">
            <h3>Tell us what's on your mind today!</h3>
            <form action="create-post" className="post-body" onSubmit={submitPost}>
                <input type="text" id="post-title" placeholder="Post Title" className="new-post-input" />
                <textarea placeholder="Post Content" className="new-post-input" />
                <input type="file" id="image-url-new-post" placeholder="Image path..." className="new-post-input" />
                {/* <Button type="file" className='new-post__button' onClick={attachImage} buttonContent='Click here to add a picture' /> */}
                <Button type='submit' className='new-post__button' buttonContent='Add Post' />
            </form>

        </div>
    )
}

export default NewPost