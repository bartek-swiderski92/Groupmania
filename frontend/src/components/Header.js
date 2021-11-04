import '../styles/Header.css'
import Button from './Button';

function Header() {
    return (
        <header>
            <h1>Groupmania</h1>
            <Button buttonContent="Logout" className='header' />
        </header>
    )
}

export default Header