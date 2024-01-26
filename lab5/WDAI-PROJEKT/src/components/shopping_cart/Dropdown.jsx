import { useEffect } from 'react';
import { useState } from 'react';
import '../../styles/dropdown.css'

function Dropdown(){

    const [refreshed, setRefreshed] = useState([]);

    // Once we integrate product fetching, then we will keep the "stashed" products in local storage as a list
    // Then we will pull them from said list and map each one of them here
    if(JSON.parse(localStorage.getItem("cart")) != null){

        var products = JSON.parse(localStorage.getItem("cart"));
    } else {
        products = []
    }

    if(!products || products.length == 0) return (
        <div className="dropdownContainer">
            <h3>Koszyk jest pusty</h3>
        </div>
    )

    function removeItem(index){
        var newCart = JSON.parse(localStorage.getItem("cart"));
        if(newCart.length == 1) {
            localStorage.removeItem("cart");
        } else {
            newCart.splice(index,1);
            localStorage.cart = JSON.stringify(newCart);
        }
        setRefreshed(newCart[index]);
    }
    return (

        <div className="dropdownContainer">
            <ul className='itemList'>
                {products.map((product) => {
                        return (
                            <li key={product.id} className='dropdownItem'>
                                <h4 className='cartItemTitle'>{product.title}</h4><br/>
                                <button onClick={() => {removeItem(products.indexOf(product))}} className='removeButton'>Usuń</button>
                            </li>
                        )
                    })}
            </ul> 

            <button className='confirmButton'>
                Przejdź do płatności
            </button>

        </div>
    )
}

export default Dropdown;