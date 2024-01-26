import { Link } from 'react-router-dom'
import '../styles/footer.css'

export const Footer = () => (
    <footer className="flex">
        <ul className="flex column footer__list">
            <h3 className='footer__header'>Przydatne linki:</h3>
            <li>
                <Link to="https://www.instagram.com/" className='footer__link'>
                    <p className='footer__linkTitle'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="" className='footer__linkImg' />
                        Obczaj najnowsze trendy na naszym instagramie
                    </p>
                </Link>
            </li>
            <li>
                <Link to="https://www.facebook.com/" className='footer__link'>
                    <p className='footer__linkTitle'>
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1024px-Facebook_f_logo_%282021%29.svg.png?20210818083032" alt="" className='footer__linkImg' />
                        Wpadaj na naszego facebooka
                    </p>
                </Link>
            </li>
            <li>
                <Link to="https://www.tiktok.com/explore" className='footer__link'>
                    <p className='footer__linkTitle'>
                        <img src="https://logowik.com/content/uploads/images/tiktok-black-icon5820.jpg" alt="" className='footer__linkImg' />
                        Zerknij na naszego tik toka
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/FAQ" className='footer__link'>
                    <p className='footer__linkTitle'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Black_question_mark.png" alt="" className='footer__linkImg' />
                        Często zadawane pytania
                    </p>
                </Link>
            </li>
            <li>
                <Link to="/kontakt" className='footer__link'>
                    <p className='footer__linkTitle'>
                        <img src="https://cdn0.iconfinder.com/data/icons/cosmo-work/40/mail-512.png" alt="" className='footer__linkImg' />
                        Skontaktuj się z nami
                    </p>
                </Link>
            </li>
        </ul>
    </footer>
)