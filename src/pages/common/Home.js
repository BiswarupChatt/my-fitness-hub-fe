import { useState, useEffect } from "react"
import { useAuth } from "../../services/context/AuthContext"
import { Helmet } from "react-helmet"
import Features from "../../components/home/Features"
import Hero from "../../components/home/Hero"
import FAQ from "../../components/home/FAQ"
import Highlights from "../../components/home/Highlights"
import Footer from "../../components/Footer"
import ShowAllClients from "../../components/coach/table/ClientTable"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';



export default function Home() {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const dialogShown = sessionStorage.getItem('dialogShown')

        if (!dialogShown) {
            const timer = setTimeout(() => {
                setOpen(true)
                sessionStorage.setItem('dialogShown', 'true')
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [])

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
                : (
                    user.account.role === 'client' ? (
                        <>
                            Welcome {user.account.firstName}
                        </>
                    ) : (<>
                        <p>Welcome {user.account.firstName}</p>
                        <ShowAllClients user={user} />
                    </>)
                )}
            <Footer />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Please Take a Moment to Read</DialogTitle>
                <DialogContent>
                    <p>
                        Thank you for visiting! 🚧 This website is still under construction.
                    </p>
                    <p>
                        I'm working hard to get everything up and running. In the meantime, feel free to explore—many features are already available!
                    </p>
                    <p>
                        Your support means the world to me. Wish me luck as I continue building this project! 🙏
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Best of Luck, Keep Going!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}