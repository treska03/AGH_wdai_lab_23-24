import '../../styles/profile.css'
import { useRef } from "react";

export const LogIn = () => {
    const usernameField = useRef();
    const passwordField = useRef();


    function logIn(){
        var credentials = {
            "username": usernameField.current.value.toString(), 
            "password": passwordField.current.value.toString(),
        };
        const requestOptions = {
            method: "POST",
            headers: {'Accept': "application/json, text/plain, */*",
            'Content-Type': "application/json;charset=utf-8"},
            body: JSON.stringify(credentials)
        };
        fetch('http://127.0.0.1:2137/login', requestOptions)
        .then((response) => response.json())
        .then(data => {
            if(data.msg == null){
                localStorage.setItem("token", JSON.stringify(credentials))
                // This should be hased so the user cant really access it from the get go
                // but whatever, I dont want to do it :)
                window.location.reload(false);
            } else {
                window.alert("Podano niewłaściwe dane")
            } 
        })
        .catch((error) => { console.log(error)});
    }
    return (
        <div className="profileContainer">
            <div className='loginContainer'>
                <h2> Zaloguj się </h2>
                <form className='loginForm'>
                    <label>Podaj nazwę użytkownika</label><br/>
                    <input ref={usernameField} type="text" className='inputField'></input><br/>
                    <label>Podaj hasło</label><br/>
                    <input ref={passwordField} type="password" className='inputField'></input><br/>
                </form><br/>
                <button onClick={logIn}>ZALOGUJ</button>
            </div>
        </div>
    )
}