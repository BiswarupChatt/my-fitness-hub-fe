// import AddClientNutrition from "../addClientNutrition/AddClientNutrition"
import AddMealPlan from "../addClientNutrition/AddMealPlan"
import { useParams } from "react-router-dom"


export default function ClientNutrition() {
    const { clientId } = useParams()

    console.log('Client ID in ClientNutrition:', clientId)

    return (
        <>
            <AddMealPlan clientId={clientId} />
        </>
    )
}