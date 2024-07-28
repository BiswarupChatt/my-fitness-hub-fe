import { useAuth } from "../services/context/AuthContext"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { errorToast } from "../utils/toastify"

export default function PrivateRoute({ permittedRoles, children }) {
    const { user } = useAuth()
    console.log("auth calling", user)
    const location = useLocation()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()


    if (!user) {
        if (token) {
            // replaced with loading element later
            return <p>Loading...</p>
        } else {
            return (<Navigate to='/login' state={{ from: location }} />)
        }
    }

    if (!user.account) {
        return <p>Loading...</p>
    }

    if (!permittedRoles.includes(user.account.role)) {
        errorToast('You are unauthorized to access this page.')
        return (
            <Navigate to='/unauthorized' />
        )
    }
    else {
        return children
    }
}