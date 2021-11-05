import footerLinks from '../data/footer-links'
import '../styles/Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                {footerLinks.map((object, id) => (
                    <div className="footer-list-wrapper">
                        <div className="footer-container__title">
                            {object.name}
                        </div>
                        <ul className='footer-container__list' key={object.name + '-' + id + 'ul'}>
                            {object.elements.map((element, id) => (
                                <li className="footer-container__link" key={element.name + '-' + id}><a href={element.href}>{element.name}</a></li>
                            ))}
                        </ul>
                    </div>

                ))}
            </div>
        </footer>
    )
}

export default Footer