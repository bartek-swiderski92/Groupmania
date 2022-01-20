import { useEffect, useState } from 'react';
import { getUserDetails, api } from '../main'
import '../styles/UserProfile.css';
import Post from './Post';

function UserProfile(props) {
    console.log('user profile', props.userLoggedIn)

    const [userDetails, setUser] = useState('');
    useEffect(() => {
        getUserDetails(api.users + '/' + document.URL.split('/')[4]).then((res) => {
            setUser(res)
        })
        // console.log(userDetails)
    }, [])

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

                    Email: {userDetails.email} <br />
                    Gender: {userDetails.gender}  <br />
                    Birthday: {userDetails.dob} <br />
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