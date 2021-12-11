import { appUrl } from '../main'
// import { useHistory, BrowserRouter, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';


import '../styles/Header.css'
import '../styles/Main.css'

import Button from './Button';

function Header(userLoggedIn) {
    console.log(userLoggedIn)
    const history = useHistory();

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');

        history.push('/redirect');
    }

    return (
        <header>
            <h1><a className="logo link" href={appUrl}>Groupmania</a></h1>
            {(() => {
                if (userLoggedIn === 1) {
                    return (
                        <div>
                            <div className="button-container">
                                <Button buttonContent="My profile" className='header' />
                                <Button buttonContent="Logout" onClick={logout} className='header' />
                            </div>
                        </div>
                    )
                } else if (userLoggedIn === 0) {
                    return <button>BUTTON</button>
                }
            })()
            }
        </header>
    )
}

export default Header