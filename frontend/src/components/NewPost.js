import { useEffect, useState } from 'react';
import axios from 'axios';

import { api, apiUrl, getPosts } from '../main';
import { useHistory } from 'react-router-dom';

import Button from './Button'
import '../styles/NewPost.css'

function NewPost({ editPost }) {
    const history = useHistory();

    const [post, setPosts] = useState([]);
    const [postMedia, setPostMedia] = useState([]);

    useEffect(() => {
        getPosts(api.posts + '/' + document.URL.split('/')[5]).then((res) => {
            setPosts(res)
            setPostMedia(res.media)
        })
    }, [])

    function removeImage(event) {
        event.preventDefault();
        setPostMedia(null)
        console.log(postMedia)

    }

    function submitPost(event) {
        const token = localStorage.getItem('token');
        event.preventDefault();
        const [postTitle, postContent, postMedia] = event.target.elements;
        let formdata = new FormData();
        formdata.append('postTitle', postTitle.value)
        formdata.append('postContent', postContent.value)
        formdata.append('image', event.target[2].files[0])
        console.dir(event.target[2].files[0])
        for (var value of formdata.values()) {
            console.log(value);
        }


        if (editPost === true) {
            axios.put(`${apiUrl}/posts/` + post.id,
                formdata
                , {
                    headers: {
                        "Authorization": `Bearer: ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(res => {
                    window.alert(res.data.message)
                    history.push(`/post/${res.data.post.id}`)
                })
                .catch(err => console.log(err))
        } else {
            axios.post(`${apiUrl}/posts`,
                formdata
                , {
                    headers: {
                        "Authorization": `Bearer: ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(res => {
                    window.alert(res.data.message)
                    history.push(`/post/${res.data.post.id}`)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="new-post-wrapper">
            {editPost ? <h3>Edit your post:</h3> : <h3>Tell us what's on your mind today!</h3>}
            {/* <h3>Tell us what's on your mind today!</h3> */}
            <form action="create-post" className="post-body" onSubmit={submitPost} enctype="multipart/form-data">
                <input type="text" id="post-title" placeholder="Post Title" className="new-post-input" defaultValue={editPost ? post.postTitle : ''} />
                <textarea placeholder="Post Content" className="new-post-input" defaultValue={editPost ? post.postContent : ''} />
                {postMedia !== null ? (
                    <div className="post__media">
                        <img src={post.media} alt={'tablet'} />
                        <Button className="delete" onClick={removeImage} buttonContent="Remove Image" />
                    </div>
                ) : (
                    <input type="file" name="image" id="image-url-new-post" className="new-post-input" />
                )
                }
                <Button type='submit' className='new-post__button' buttonContent={editPost ? 'Save Changes' : 'Add Post'} />
            </form>

        </div>
    )
}

export default NewPost