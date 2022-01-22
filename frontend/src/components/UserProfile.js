import { useEffect, useState } from 'react';
import { getUserDetails, api } from '../main'
import '../styles/UserProfile.css';
import Post from './Post';
import Button from './Button';

function UserProfile() {
    const [userDetails, setUser] = useState('');
    const [editProfile, setEditProfile] = useState(true)
    useEffect(() => {
        getUserDetails(api.users + '/' + document.URL.split('/')[4]).then((res) => {
            setUser(res)
        })
    }, [])

    function selectGender() {
        const maleInput = document.querySelector('input#male');
        const femaleInput = document.querySelector('input#female');
        const preferInput = document.querySelector('input#prefer');

        switch (userDetails.gender) {
            case "Male":
                maleInput.checked = true;
                break;
            case "Female":
                femaleInput.checked = true;
                break;
            case "Prefer not to say":
                preferInput.checked = true;
                break;
            default:
                return
        }
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
                            return <>
                                <Button onClick={() => console.log('click')} buttonContent='Edit Profile' className="edit" /> <br />
                            </>
                        }
                    }
                    )()}
                    {(() => {
                        if (!editProfile) {
                            return (<>
                                Email: {userDetails.email} <br />
                                Gender: {userDetails.gender}  <br />
                                Birthday: {userDetails.dob} <br /></>)
                        } else {
                            return (
                                <form onSubmit={() => console.log('updating')} action="update-profile" className="profile-body">
                                    <label htmlFor="firstName">First Name: </label>
                                    <input id="firstName" type="text" value={userDetails.firstName} />
                                    <label htmlFor="secondName">Second Name: </label>
                                    <input id="secondName" type="text" value={userDetails.secondName} />
                                    <label htmlFor="email">Email: </label>
                                    <input id="email" type="text" value={userDetails.email} />
                                    <div>
                                        Gender:
                                        <input id="male" type="radio" value="Male" />
                                        <label htmlFor="male">Male: </label>
                                        <input id="female" type="radio" value="Female" />
                                        <label htmlFor="female">Female: </label>
                                        <input id="prefer" type="radio" value="Prefer not to say" />
                                        <label htmlFor="prefer">Prefer not to say: </label>
                                    </div>
                                    {selectGender()}
                                    <label htmlFor="birthday">Birthday: </label>
                                    <input id="birthday" type="text" value={userDetails.dob} />
                                    <label htmlFor="profilePicture">Profile Picture: </label>
                                    <input id="profilePicture" type="file" />

                                    <Button onClick={() => console.log('saving profile')} buttonContent="Save Profile" className="submit" />
                                </form>
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
                            <Post key={'post-' + post.id} post={post} user={userDetails} displayLikes={false} />
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