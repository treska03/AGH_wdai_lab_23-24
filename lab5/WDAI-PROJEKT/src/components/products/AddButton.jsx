import { Link } from 'react-router-dom'
import useAuth from '../user/useAuth'

function AddButton(){
    const { isAdmin, isEmployee } = useAuth();
    if(isAdmin, isEmployee){
        return(
            <li>
                <Link to="/produkty/dodaj">
                    <button>Dodaj produkty</button>
                </Link>
            </li>
        )
    } else {
        return null
    }
}

export default AddButton