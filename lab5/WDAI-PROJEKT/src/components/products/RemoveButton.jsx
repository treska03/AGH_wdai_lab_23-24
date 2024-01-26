import { Link } from 'react-router-dom'
import useAuth from '../user/useAuth'

function RemoveButton(){
    const { isAdmin, isEmployee } = useAuth();
    if( isAdmin || isEmployee){
        return(
            <li>
                <Link to="/produkty/usun">
                    <button>Usuń produkty</button>
                </Link>
            </li>
        )
    } else {
        return null
    }
}

export default RemoveButton