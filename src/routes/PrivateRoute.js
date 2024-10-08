import { useAuth } from "../services/context/AuthContext"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { errorToast } from "../utils/toastify"
import { CircularProgress, LinearProgress, Box } from "@mui/material"

export default function PrivateRoute({ permittedRoles, children }) {
    const { user } = useAuth()
    console.log("auth calling, private route file", user)
    const location = useLocation()
    const token = localStorage.getItem('token')


    if (!user.isLoggedIn && token) {
        // return <CircularProgress sx={{ margin: 10 }} />
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    // if (!user.account) {
    //     console.log('2')
    //     return <p>Loading...</p>
    // }

    if (!user.isLoggedIn) {
        return (<Navigate to='/login' state={{ from: location }} />)
    }

    if (!permittedRoles.includes(user.account.role)) {
        errorToast('You are unauthorized to access this page.')
        return (
            <Navigate to='/forbidden' />
        )
    }
    else {
        return children
    }
}