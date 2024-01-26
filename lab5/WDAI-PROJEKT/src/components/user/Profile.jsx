import { LogIn } from "./LogIn";
import { LogOut } from "./LogOut";


export const Profile = () => {

    if(localStorage.getItem("token") == null) {
        return (
            <LogIn/>
        )
    } else {
        return (
            <LogOut/>
        )
    }
}
