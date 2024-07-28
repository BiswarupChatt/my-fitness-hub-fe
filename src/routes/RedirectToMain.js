import { errorToast } from "../utils/toastify";
import { useAuth } from "../services/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RedirectToMain({ children }) {
    const { user } = useAuth()

    if (user.isLoggedIn) {
        errorToast("You're Already Logged In")
        return (<Navigate to='/account'></Navigate>)
    }
    else {
        return children
    }
}