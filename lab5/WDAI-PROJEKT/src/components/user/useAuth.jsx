import { useEffect } from "react";
import { useState } from "react";

const useAuth = () => {
    const [token, setToken] = useState(false);
    let isEmployee = false;
    let isAdmin = false;

    if(localStorage.getItem("token") == null){
        return { username: '', role: [], isEmployee, isAdmin }
    }

    var credentials = {
        "username": JSON.parse(localStorage.getItem("token")).username, 
        "password": JSON.parse(localStorage.getItem("token")).password,
    };
    const requestOptions = {
        method: "POST",
        headers: {'Accept': "application/json, text/plain, */*",
        'Content-Type': "application/json;charset=utf-8"},
        body: JSON.stringify(credentials)
    };
    useEffect(()=>{
        fetch('http://127.0.0.1:2137/login', requestOptions)
        .then((response) => response.json())
        .then(data => {
            if(data.msg == null){
                setToken(data);
            } else {
                // Just in case the user does something sketchy
                localStorage.removeItem("token");
            } 
            })
        .catch((error) => { console.log(error)});
    },[])
    if (token) {
        if ( token.token == 'token_for_admin' ){
            isAdmin = true;
            isEmployee = true;
        } else if ( token.token == 'token_for_employee' ){
            isEmployee = true;
        } else {

        }
    } 
    return { username: credentials.username, role: [], isEmployee, isAdmin }
}
export default useAuth