import { useAuth } from "../../services/context/AuthContext"
import { Helmet } from "react-helmet"
export default function Home() {
    const { user } = useAuth()
    console.log(user)
    return (
        <div>
            <Helmet>
                <title>My Fitness Hub</title>
            </Helmet>
            <h2>Home Screen</h2>
            {!user.isLoggedIn ? <p>User Not Logged In</p> : <p>Welcome {user.account.firstName}</p>}
        </div>
    )
}