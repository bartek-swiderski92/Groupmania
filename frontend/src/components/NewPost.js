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

    let deleteImageFlag = false;

    function loadFile(event) {
        console.log('change')
        const output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.style.display = 'block'
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        };
        document.querySelector('#remove-img-btn').classList.remove('hidden')
    };

    function deleteImage(event) {  // Deleting image from the post
        event.preventDefault();
        setPostMedia(null)
        console.log('delete')
        deleteImageFlag = true;

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
        let formdata = new FormData();
        formdata.append('postTitle', postTitle.value)
        formdata.append('postContent', postContent.value)
        formdata.append('image', event.target[2].files[0])
        console.dir(event.target[2].files[0])

        if (editPost === true) {
            axios.put(`${apiUrl}/posts/` + post.id,
                formdata,
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
                <div className="post__media">
                    {postMedia?.length > 1 ? (
                        <>
                            <img src={post.media} alt={post.postTitle} />
                            <input type="file" accept='image/*' name="image" id="image-input" className="new-post-input" onChange={loadFile} />
                            <img id="output" alt={post.postTitle} style={{ display: 'none' }} />
                            <Button className="delete" onClick={deleteImage} buttonContent="Delete image" />
                        </>
                    ) : (
                        <>
                            <input type="file" accept='image/*' name="image" id="image-input" className="new-post-input" onChange={loadFile} />
                            <img id="output" alt={post.postTitle} style={{ display: 'none' }} />
                            <Button className="delete hidden" id="remove-img-btn" onClick={deleteImgPreview} buttonContent="Remove Image" />
                        </>
                    )
                    }
                </div>
                <Button type='submit' className='new-post__button' buttonContent={editPost ? 'Save Changes' : 'Add Post'} />
            </form>

        </div>
    )
}

export default NewPost