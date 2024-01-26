import { useRef } from "react";
import { Link } from 'react-router-dom'
import useAuth from "../user/useAuth";
import '../../styles/remover.css'

export const RemoveProducts =()=>{
    const {isAdmin, isEmployee} = useAuth();

    const idField = useRef();

    function handleRemove(){
        var id = idField.current.value.toString()

        const requestOptions = {
            method: "DELETE",
        };
        fetch(`http://127.0.0.1:2137/products/delete/${id}`, requestOptions)
    }
    if(isAdmin || isEmployee){
        return (
            <div className="mainContainter">
                <h3>Podaj id produktu, który chcesz usunąć</h3>
                <textarea ref={idField} className='inputFieldRemover'></textarea><br/>
                <Link to="/produkty">
                    <button onClick={handleRemove}>Zatwierdź</button>
                </Link>
            </div>
        )
    } else {
        return (
            <h1>Odmowa dostępu</h1>
        )
    }
}