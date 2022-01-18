import React from 'react'
import { useHistory } from 'react-router-dom';




function RedirectComponent() {
    const history = useHistory();

    setTimeout(function () {

        if (localStorage.getItem('token')) {
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