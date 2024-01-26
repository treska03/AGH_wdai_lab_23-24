import { useRef } from "react";
import '../../styles/adder.css'
import useAuth from "../user/useAuth";

export const AddProducts = () => {
    const {isAdmin, isEmployee} = useAuth(); 
    const titleField = useRef();
    const descField = useRef();
    const thumbField = useRef();
    const priceField = useRef();

    function handleConfirmation(){

        var product = {
            "title": titleField.current.value.toString(), 
            "description": descField.current.value.toString(),
            "thumbnail": thumbField.current.value.toString(),
            "price": priceField.current.value.toString()
        }

        const requestOptions = {
            method: "POST",
            headers: {'Accept': "application/json, text/plain, */*",
            'Content-Type': "application/json;charset=utf-8"},
            body: JSON.stringify(product)
        };
        fetch('http://127.0.0.1:2137/products/create', requestOptions)

    }

    if(isAdmin || isEmployee){
    return (
        <div className="mainContainer">
            <div className="formContainer">
                <form>
                    <label className="formLabel">
                        Nazwa produktu
                    </label>
                    <br/>
                    <textarea rows="4" cols="50" ref={titleField} className="formInput"></textarea>
                    <br/>
                    <label className="formLabel">
                        Opis produktu
                    </label>
                    <br/>
                    <textarea rows="4" cols="50" ref={descField} className="formInput"></textarea>
                    <br/>
                    <label className="formLabel">
                        Zdjęcie
                    </label>
                    <br/>
                    <textarea rows="4" cols="50" ref={thumbField} className="formInput"></textarea>
                    <br/>
                    <label className="formLabel">
                        Cena
                    </label>
                    <br/>
                    <textarea rows="4" cols="50" ref={priceField} className="formInput"></textarea>
                    <br/>
                </form>
                <button className="confirmButton" onClick={handleConfirmation}>ZATWIERDŹ</button>
            </div>
        </div>
    )
    } else {
        return (
            <h1>Odmowa dostępu</h1>
        )
    }

    

}
