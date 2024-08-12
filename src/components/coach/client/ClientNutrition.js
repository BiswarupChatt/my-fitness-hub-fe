import AddClientNutrition from "../addClientNutrition/AddClientNutrition"
import { useParams } from "react-router-dom"

export default function ClientNutrition() {

    const { clientId } = useParams();

    console.log('Client ID in ClientNutrition:', clientId)

    return (
        <>
            <AddClientNutrition clientId={clientId} />
        </>
    )
}