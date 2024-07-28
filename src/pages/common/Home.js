import { useAuth } from "../../services/context/AuthContext"
import { Helmet } from "react-helmet"
import Features from "../../components/home/Features"
import Hero from "../../components/home/Hero"
import FAQ from "../../components/home/FAQ"
import Highlights from "../../components/home/Highlights"
import Footer from "../../components/Footer"
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
                    <Highlights />
                    <FAQ />
                </>
                : <>
                    <p>Welcome {user.account.firstName}</p>
                </>}
            <Footer />
        </div>
    )
}