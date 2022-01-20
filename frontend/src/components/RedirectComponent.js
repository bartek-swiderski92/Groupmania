import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';




function RedirectComponent(props) {
    const history = useHistory();
    const location = useLocation();
    setTimeout(function () {
        if (location.state.userLoggedIn) {
            history.push('/newsfeed')
        } else {
            history.push('/login')
        }
    }, 3000);
    return (
        <div>Redirecting...</div>
    )
}

export default RedirectComponent