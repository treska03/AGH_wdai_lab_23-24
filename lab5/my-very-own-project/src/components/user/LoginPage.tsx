import { useState } from "react";
import { useNavigate } from "react-router-dom";

const goodHash = (toHash : string) => {
    return toHash + "a".repeat(toHash.length);
}

export const LoginPage = () => {
    const token = localStorage.getItem("access_token");
    const isLoggedIn = !!token;
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const fetchUser = async (event : any) => {
        
        event.preventDefault();
        const formData = new FormData(event.target);
        const formFields = Object.fromEntries(formData);
        const username = formFields.username.toString();
        const password = formFields.password.toString();
        console.log(JSON.stringify( {
            "username" : formFields.username.toString(),
            "password" : JSON.stringify(goodHash(password))
        }),);
        
        
        
        const response = await fetch("http://127.0.0.1:2137/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify( {
                "username" : username,
                "password" : JSON.stringify(goodHash(password))
            }),
        });

        if(!response.ok) {
            setError(await response.text())
        }
        else {
            const tokenJson = await response.json();
            
            localStorage.setItem("access_token", tokenJson.token);
            
            navigate("/profile");
        }
    };

    const handleLogin = async (event : any) => {
        await fetchUser(event);
        return (<h1>Corectly logged in</h1>)
    }

    if(isLoggedIn) return <h1>User is already signed in!</h1>

    return(
    <>
        <span>{error}</span>
        <form id="loginForm" onSubmit={(e) => handleLogin(e)}>
            <h1>Login</h1>
            <label >Username</label>
            <input 
                type="text"
                name="username"
                className="productDesc"/>
            <label >Password</label>
            <input 
                type="text"
                name="password"
                className="productDesc"/>
            <input type="submit"/>
        </form>
    </>
    );
}