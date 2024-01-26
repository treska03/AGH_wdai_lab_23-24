import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import Dropdown from './shopping_cart/Dropdown'
import { useState } from 'react'

export const Navbar = () => {

    const [display, setDisplay] = useState('none')

    function dropdownViewer(){
        if(display =='none'){
            setDisplay('block')
        } else {
            setDisplay('none')
        }
    }

    function handleMouseEnter(){
        setDisplay('block')
    }

    function handleMouseLeave(){
        setDisplay('none')
    }
    return (
        <nav>
            <div className="flex">
                <div className="navLeft block">
                    <ul>
                        <li className="container__logo">
                            <Link to="/" className="navbar__link">
                                <img src="https://brandlogos.net/wp-content/uploads/2022/08/shop_pay-logo_brandlogos.net_tyf5p-512x512.png" alt="LOGO" className='logoIcon' />
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="navbar__link">Home Page</Link>
                        </li>
                        <li>
                            <Link to="/produkty" className="navbar__link">Produkty</Link>
                        </li>
                        <li>
                            <Link to="#" className="navbar__link">Kontakt</Link>
                        </li>
                        <li>
                            <Link to="/FAQ" className="navbar__link">FAQ</Link>
                        </li>
                    </ul>
                </div>
                <div className="navRight block">
                    <ul>
                        <li>
                            <img src="https://pngimg.com/d/shopping_cart_PNG4.png" alt="KOSZYK" onMouseEnter={dropdownViewer} className='cartIcon'/>
                            <div style={{display:display}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                                <Dropdown></Dropdown>
                            </div>
                        </li>
                        <li>
                            <Link to="/profil" className="navbar__link">Profil</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
