import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

import { getUserDetails, api, apiUrl, formatDate } from '../main'
import Post from './Post';
import Button from './Button';
import '../styles/UserProfile.css';
function UserProfile({ logout }) {
    const token = localStorage.getItem('token');
    const [userDetails, setUser] = useState('');
    const [changePassword, setChangePassword] = useState(false)
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

    function openForm(task) {
        const profileBtns = [...document.querySelectorAll('.profile-btn')]
        if (task === 'password') {
            setChangePassword(true)
        } else if (task === 'edit') {
            setEditProfile(true)
        }
        profileBtns.forEach(button => {
            button.disabled = true;
            button.classList.add('disabled')
        });
    }

    function closeForm() {
        const profileBtns = [...document.querySelectorAll('.profile-btn')]
        setEditProfile(false);
        setChangePassword(false);
        profileBtns.forEach(button => {
            button.disabled = false;
            button.classList.remove('disabled');
        });
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

    function changePassowrd(event) {
        event.preventDefault();
        const [oldPassword, newPassword, newPasswordRepeat] = event.target.elements;
        if (newPassword.value === newPasswordRepeat.value) {
            axios.put(`${apiUrl}/users/password/`,
                {
                    "password": oldPassword.value,
                    "newPassword": newPassword.value
                }
                , {
                    headers: {
                        "Authorization": `Bearer: ${token}`
                    }
                })
                .then(res => {
                    window.alert(res.data.message)
                    closeForm()
                })
                .catch(err => {
                    window.alert(err.response.data.error)
                })
        } else {
            window.alert('New Password Fields must match!')
        }
    }

    function submitProfile(event) {
        event.preventDefault();
        const [firstName, secondName, email] = event.target.elements
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
                                <Button onClick={() => openForm('password')} id="change-password-profile-btn" buttonContent='Change Password' className="edit profile-btn" />
                                <Button onClick={() => openForm('edit')} id="edit-profile-btn" buttonContent='Edit Profile' className="edit profile-btn" />
                                <Button onClick={deleteProfile} id="delete-profile-btn" buttonContent='Delete Profile' className="delete profile-btn" />
                            </div>
                        }
                    }
                    )()}
                    {(() => {
                        if (changePassword === true) {
                            return (<>
                                <form onSubmit={changePassowrd} action="update-profile" className="profile-body">
                                    <label htmlFor="oldPassword">Old Password: </label>
                                    <input id="oldPassword" type="password" required />
                                    <label htmlFor="secondName">New Password:</label>
                                    <input id="newPasswordRepeat" type="password" required />
                                    <label htmlFor="newPasswordRepeat">Repeat New Password:</label>
                                    <input id="newPasswordRepeat" type="password" />
                                    <Button type='submit' buttonContent="Change Password" className="submit" />
                                </form>
                                <Button onClick={closeForm} id="cancel-edit-btn" buttonContent="Cancel" className="delete" />
                            </>
                            )
                        } else if (editProfile) {
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
                        } else {
                            return (
                                <div>
                                    <div className="user-email">Email: {userDetails.email}</div>
                                    <div className="user-birthday">Birthday: {userDetails.dob ? formatDate(userDetails.dob, true) : null}</div>
                                </div>
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
                        )).reverse()
                        )
                    } else {
                        <div>No posts</div>
                    }
                })()}

            </div>
        </div >
    )
}

export default UserProfile