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
    const [deleteImageFlag, setDeleteImageFlag] = useState(false)
    useEffect(() => {
        getPosts(api.posts + '/' + document.URL.split('/')[5]).then((res) => {
            setPosts(res)
            setPostMedia(res.media)
        })
    }, [])

    function loadImagePreview(event) {
        const output = document.getElementById('output');
        if (event && event.target.files[0]) {
            console.log('event')
            output.src = URL.createObjectURL(event.target.files[0]);
            output.style.display = 'block'
            output.onload = function () {
                URL.revokeObjectURL(output.src) // free memory
            };
            document.querySelector('#remove-img-btn').classList.remove('hidden')
        }
    };

    function deleteImage(event) {  // Deleting image from the post
        event.preventDefault();
        setPostMedia(null)
        setDeleteImageFlag(true)
    }

    function deleteImgPreview(event) { //Removing displaying image from the front end
        event.preventDefault();
        const output = document.getElementById('output');
        const imgInput = document.getElementById('image-input');
        document.querySelector('#remove-img-btn').classList.add('hidden')

        console.log('preview')
        output.removeAttribute('src')
        output.style.display = 'none'

        imgInput.value = null
    }

    function submitPost(event) {
        const token = localStorage.getItem('token');
        event.preventDefault();
        const [postTitle, postContent] = event.target.elements;

        let formData = new FormData();
        formData.append('postTitle', postTitle.value);
        formData.append('postContent', postContent.value);
        formData.append('image', event.target[2].files[0]);

        if (editPost === true) {
            if (deleteImageFlag === true) {
                axios.delete(`${apiUrl}/posts/picture/` + post.id, {
                    headers: {
                        "Authorization": `Bearer: ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(res => {
                        console.log(res.data.message)
                    })
                    .catch(err => console.log(err))
            }
            axios.put(`${apiUrl}/posts/` + post.id, formData,
                {
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
                formData
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
            <form action="create-post" className="post-body" onSubmit={submitPost} encType="multipart/form-data">
                <input type="text" id="post-title" placeholder="Post Title" className="new-post-input" defaultValue={editPost ? post.postTitle : ''} required />
                <textarea placeholder="Post Content" className="new-post-input" defaultValue={editPost ? post.postContent : ''} />
                <div className="post__media">
                    {postMedia?.length > 1 ? (
                        <>
                            <img id="output" src={post.media} alt={post.postTitle} />
                            <input type="file" accept='image/*' name="image" id="image-input" className="new-post-input" onChange={loadImagePreview} />
                            {/* <img id="output" alt={post.postTitle} style={{ display: 'none' }} /> */}
                            <Button className="delete" id="remove-img-btn" onClick={deleteImage} buttonContent="Delete image" />
                        </>
                    ) : (
                        <>
                            <input type="file" accept='image/*' name="image" id="image-input" className="new-post-input" onChange={loadImagePreview} />
                            <img id="output" alt={post.postTitle} style={{ display: 'none' }} />
                            <Button className="delete hidden" id="remove-img-btn" onClick={deleteImgPreview} buttonContent="Remove Image" />
                        </>
                    )
                    }
                </div>
                <Button type='submit' className='new-post__button' buttonContent={editPost ? 'Save Changes' : 'Add Post'} />
                {editPost ? <Button onClick={() => history.push(`/post/${post.id}`)} className='new-post__button' buttonContent="Cancel" /> : null}
            </form>

        </div>
    )
}

export default NewPost