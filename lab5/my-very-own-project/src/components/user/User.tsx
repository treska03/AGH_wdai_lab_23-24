import { useEffect, useState } from "react";

interface UserProps {
    logged_in_as : string;
}

export const UserProfile = () => {
    const [user, setUser] = useState<UserProps>();
    const token = localStorage.getItem("access_token");
    const isLoggedIn = !!token;
    

    if(!isLoggedIn) return <h1>You don't have permission to view the page</h1>
    
    useEffect(() => {
        const fetchUser = async () => {
            
            const response = await fetch("http://127.0.0.1:2137/protected",{
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            if(!response.ok) {
                console.log("WTF");
                console.log(response);
                
                return <h1>WTF happened?</h1>
            }
    
            const currUser = await response.json();
            setUser(currUser);
        };

        fetchUser();
    }, []);

    if(!user) return <h1>Loading...</h1>

    return (
        <>
            <h1>Hello user!</h1>
            <h4>You're logged in as: {user.logged_in_as}</h4>
        </>
    )
}