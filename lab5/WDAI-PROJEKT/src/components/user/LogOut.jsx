import '../../styles/profile.css'
export const LogOut = () => {
    function logOut(){
        localStorage.removeItem("token");
        window.location.reload(false);
    }

    return (
        <div className='profileContainer'>
            <h1>Witaj {JSON.parse(localStorage.getItem("token")).username}!</h1><br/>
            <button onClick={logOut}>Wyloguj</button>
        </div>
    )
}