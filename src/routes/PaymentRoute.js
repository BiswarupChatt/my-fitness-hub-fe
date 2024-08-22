import { Navigate } from "react-router-dom"
import { useAuth } from "../services/context/AuthContext"
import moment from "moment"

export default function PaymentRoute({ children }) {
    const { user } = useAuth()

    if (user && user.profile.payment.endDate) {
        const currentDate = moment()
        const expirationDate = moment(user.profile.payment.endDate)

        if (currentDate.isAfter(expirationDate)) {
            return <Navigate to='pricing' />
        }

        return children
    }


}

//user.profile.payment.endDate