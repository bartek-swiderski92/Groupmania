import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';




function RedirectComponent(props) {
    const history = useHistory();
    const location = useLocation();
    console.log('from rediresct', location.state.userLoggedIn)
    const login = localStorage.getItem('token')
    setTimeout(function () {

        if (location.state.userLoggedIn) {
            console.log('true')
            history.push('/newsfeed')
        } else {
            console.log('false')
            history.push('/login')
        }
    }, 3000);
    return (
        <div>Redirecting...</div>
    )
}

export default RedirectComponent