import { useEffect, useState } from 'react';
import { getUserDetails, api, apiUrl, formatDate } from '../main'
import '../styles/UserProfile.css';
import Post from './Post';
import Button from './Button';
import axios from 'axios';
import { useParams } from 'react-router-dom'
function UserProfile({ logout }) {
    const token = localStorage.getItem('token');

    const [userDetails, setUser] = useState('');
    const [editProfile, setEditProfile] = useState(false)
    let { id } = useParams()
    useEffect(() => {
        getUserDetails(api.users + '/' + id).then((res) => {
            if (res.id === userDetails.id) {
                return
            } else {
                setUser(res)
            }
        })
    }, [id, userDetails.id])
    //TODO: change password
    function openForm() {
        setEditProfile(true)
        document.querySelector('#edit-profile-btn').disabled = true
        document.querySelector('#edit-profile-btn').className = 'disabled'
    }

    function closeForm() {
        setEditProfile(false);
        document.querySelector('#edit-profile-btn').disabled = false
        document.querySelector('#edit-profile-btn').className = 'edit'
    }

    function deleteProfile() {
        if (window.confirm('Are you sure you want to delete your profile? This cannot be undone!') === true) {
            axios.delete(`${apiUrl}/users/`, {
                headers:
                {
                    "Authorization": `Bearer: ${token}`
                }
            })
                .then(res => window.alert(res.data.success))
                .catch(err => console.log(err))
                .then(logout())
        }
    }


    function submitProfile(event) {
        event.preventDefault();
        const [firstName, secondName, email, birthday, profilePicture] = event.target.elements
        axios.put(`${apiUrl}/users/`, {
            "email": email.value,
            "firstName": firstName.value,
            "secondName": secondName.value,
            // "profilePicture": profilePicture.value,
            // "DOB": birthday.value
        }, {
            headers: {
                "Authorization": `Bearer: ${token}`
            }
        })
            .then(res => {
                window.alert(res.data.message)
                setUser(res.data.user)
                closeForm()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="user-profile-wrapper">
            <div className="user-details">
                <div className="user-details-main">
                    <div className="user-details-main__picture">
                        <img src={require('../media/default-picture.png').default} alt={userDetails.firstName + ' ' + userDetails.secondName + "'s profile picture"} />
                    </div>
                    <h2 className="user-details-main__name">{userDetails.firstName + ' ' + userDetails.secondName}</h2>
                </div>
                <div className="user-info">
                    {(() => {
                        if (parseInt(localStorage.getItem('userId')) === userDetails.id) {
                            return <div className="profile-buttons">
                                <Button onClick={openForm} id="edit-profile-btn" buttonContent='Edit Profile' className="edit" />
                                <Button onClick={deleteProfile} id="delete-profile-btn" buttonContent='Delete Profile' className="delete" />
                            </div>
                        }
                    }
                    )()}
                    {(() => {
                        if (!editProfile) {
                            return (<div>
                                <div className="user-email">Email: {userDetails.email}</div>
                                <div className="user-birthday">Birthday: {userDetails.dob ? formatDate(userDetails.dob, true) : null}</div>
                            </div>)
                        } else {
                            return (
                                <>
                                    <form onSubmit={submitProfile} action="update-profile" className="profile-body">
                                        <label htmlFor="firstName">First Name: </label>
                                        <input id="firstName" type="text" defaultValue={userDetails.firstName} />
                                        <label htmlFor="secondName">Second Name: </label>
                                        <input id="secondName" type="text" defaultValue={userDetails.secondName} />
                                        <label htmlFor="email">Email: </label>
                                        <input id="email" type="text" defaultValue={userDetails.email} />
                                        {/* <label htmlFor="birthday">Birthday: </label> */}
                                        {/* <input id="birthday" type="text" defaultValue={userDetails.dob} /> */}
                                        {/* <label htmlFor="profilePicture">Profile Picture: </label> */}
                                        {/* <input id="profilePicture" type="file" /> */}
                                        <Button type='submit' buttonContent="Save Profile" className="submit" />
                                    </form>
                                    <Button onClick={closeForm} id="cancel-edit-btn" buttonContent="Cancel" className="delete" />
                                </>
                            )
                        }
                    })()}

                </div>
            </div>
            <div className="user-posts">
                {userDetails.Posts && userDetails.Posts.length ? <h3 className="posts-heading">{userDetails.firstName}'s posts:</h3> : <h3 className="posts-heading">{userDetails.firstName} has no posts</h3>}
                {(() => {
                    if (userDetails.Posts) {
                        return (userDetails.Posts.map((post) => (
                            <Post key={'post-' + post.id} post={post} user={userDetails} displayLikes={true} />
                        ))
                        )
                    } else {
                        <div>No posts</div>
                    }
                })()}

            </div>
        </div>
    )
}

export default UserProfile