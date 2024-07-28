import { useAuth } from "../../services/context/AuthContext"
import { Helmet } from "react-helmet"
import Features from "../../components/home/Features"
import Hero from "../../components/home/Hero"
export default function Home() {
    const { user } = useAuth()
    console.log(user)
    return (
        <div>
            <Helmet>
                <title>My Fitness Hub</title>
            </Helmet>
            {!user.isLoggedIn ?
                <>
                    <Hero />
                    <Features />
                </>
                : <>
                    <p>Welcome {user.account.firstName}</p>
                </>}
        </div>
    )
}