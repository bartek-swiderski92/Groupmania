import '../styles/UserProfile.css';
import { useEffect, useState } from 'react';
import { getUserDetails, api } from '../main'

function UserProfile({ user }) {
    const [userDetails, setUser] = useState('');
    useEffect(() => {
        getUserDetails(api.users + '/' + user).then((res) => {
            setUser(res)
        })
    }, '')
    return (
        <div class="user-profile-wrapper">
            <div class="user-details">
                <div class="user-details-main">
                    <div class="user-details-main__picture">
                        <img src={require('../media/default-picture.png').default} alt="profile" />
                    </div>
                    <div class="user-details-main__name">John Smith</div>
                </div>
                <div class="user-info">

                    Email: email@email.com <br />
                    Gender: Male <br />
                    Birthday: 01/01/2020<br />
                </div>
            </div>
            <div class="user-posts">
                <div>post</div>
                <div>post</div>
                <div>post</div>
                <div>post</div>
            </div>
        </div>
    )
}

export default UserProfile