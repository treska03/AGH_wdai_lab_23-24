import { useNavigate } from "react-router";

export const Logout = () => {
    const token = localStorage.getItem("access_token");
    const isLoggedIn = !!token;
    const navigate = useNavigate();

    if(!isLoggedIn) return <h1>You're not logged in yet</h1>

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/");
    }

    return (
        <button onClick={handleLogout}>Click to logout</button>
    )
}