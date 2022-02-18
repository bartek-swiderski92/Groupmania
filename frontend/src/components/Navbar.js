import { appUrl } from '../main'
// import { useHistory, BrowserRouter, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useEffect, useState } from 'react';


import '../styles/Navbar.css'
import '../styles/Main.css'

import Button from './Button';

function Navbar({ userLoggedIn, logout }) {
    const history = useHistory();

    return (
        <nav>
            <h1><a className="link" href={appUrl}><img id="site-logo" src={require('../media/icon-left-font-monochrome-white.png').default} alt="" /></a></h1>
            {(() => {
                if (userLoggedIn === true) {
                    return (
                        <div>
                            <div className="button-container">
                                <Button onClick={() => history.push(`/user/${localStorage.getItem('userId')}`)} buttonContent="My profile" className='navbar' />
                                <Button buttonContent="Logout" onClick={logout} className='navbar' />
                            </div>
                        </div>
                    )
                }
            })()
            }
        </nav>
    )
}

export default Navbar