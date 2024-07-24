import { useAuth } from "../services/context/AuthContext"
export default function Home() {
    const { user } = useAuth()
    console.log(user)
    return (
        <div>
            <h2>Home Screen</h2>
            {!user.isLoggedIn ? <p>User Not Logged In</p> : <p>Welcome {user.account.firstName} {user.profile.payment.endDate}</p>}
        </div>
    )
}
