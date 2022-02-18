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
        <navbar>
            <h1><a className="logo link" href={appUrl}>Groupmania</a></h1>
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
        </navbar>
    )
}

export default Navbar