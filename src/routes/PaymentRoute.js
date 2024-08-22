import { Navigate } from "react-router-dom"
import { useAuth } from "../services/context/AuthContext"
import moment from "moment"
import { errorToast } from "../utils/toastify"

export default function PaymentRoute({ children }) {
    const { user } = useAuth()

    if (user && user.profile.payment.endDate) {
        const currentDate = moment()
        const expirationDate = moment(user.profile.payment.endDate)

        console.log(currentDate.format("MMM Do YY"), expirationDate.format("MMM Do YY"))

        if (currentDate > expirationDate) {
            errorToast('Your plan has expire')
            return <Navigate to='/pricing' />
        }

        return children
    }


}

//user.profile.payment.endDate