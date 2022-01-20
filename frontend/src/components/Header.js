import { appUrl } from '../main'
// import { useHistory, BrowserRouter, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useEffect, useState } from 'react';


import '../styles/Header.css'
import '../styles/Main.css'

import Button from './Button';

function Header({ userLoggedIn, updateState }) {
    const history = useHistory();

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');

        history.push({ pathname: '/redirect', state: { userLoggedIn: false } })
        update(false)
    }
    function update(val) {

        updateState(val)
    }
    return (
        <header>
            <h1><a className="logo link" href={appUrl}>Groupmania</a></h1>
            {(() => {
                if (userLoggedIn === true) {
                    return (
                        <div>
                            <div className="button-container">
                                <Button buttonContent="My profile" className='header' />
                                <Button buttonContent="Logout" onClick={logout} className='header' />
                            </div>
                        </div>
                    )
                } else if (userLoggedIn === false) {
                    return <button>BUTTON</button>
                }
            })()
            }
        </header>
    )
}

export default Header