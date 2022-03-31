import { appUrl } from '../main'
import { useHistory } from 'react-router-dom';

import '../styles/Navbar.css'
import '../styles/Main.css'
import Button from './Button';

function Navbar({ userLoggedIn, logout }) {
    const history = useHistory();

    return (
        <nav>
            <a className="link" href={appUrl}><img id="site-logo" src={require('../media/icon-left-font-monochrome-white.png').default} alt="" /></a>
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