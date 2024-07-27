import { useAuth } from "../services/context/AuthContext"
import { Navigate, useLocation } from "react-router-dom"
import { errorToast } from "../utils/toastify"
import { useMemo } from "react"

export default function PrivateRoute({ permittedRoles, children }) {
    const { user } = useAuth()
    // const memoizeUser = useMemo(() => {
    //     return user, [user]
    // })
    const location = useLocation()
    const token = localStorage.getItem('token')


    if (!user && token) {
        // replaced with loading element later
        return <p>Loading...</p>
    }

    if (!user.isLoggedIn) {
        return (<Navigate to='/login' state={{ from: location }} />)
    }

    if (!permittedRoles.includes(user.account.role)) {
        errorToast('You are unauthorized to access this page.')
        return (
            <Navigate to='/' />
        )
    }
    else {
        return children
    }
}