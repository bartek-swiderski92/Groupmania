import React from 'react'
import { useHistory } from 'react-router-dom';




function RedirectComponent() {
    const history = useHistory();

    setTimeout(function () {
        if (localStorage.getItem('token')) {
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