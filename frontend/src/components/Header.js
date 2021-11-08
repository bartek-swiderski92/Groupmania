import { appUrl } from '../main'
import '../styles/Header.css'
import '../styles/Main.css'
import Button from './Button';

function Header() {
    return (
        <header>
            <h1><a className="logo link" href={appUrl}>Groupmania</a></h1>
            <div class="button-conteiner">
                <Button buttonContent="My profile" className='header' />
                <Button buttonContent="Logout" className='header' />
            </div>
        </header>
    )
}

export default Header