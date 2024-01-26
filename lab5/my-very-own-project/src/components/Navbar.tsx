import { Link } from "react-router-dom";
import '../styles/navbar.css'

export const Navbar = () => (
    <>
        <nav>
            <ul className="ulLeft">
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/meme">Memuszek</Link></li>
                <li><Link to="/sklep">Sklep</Link></li>
            </ul>
            <ul className="ulRight">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    </>
)