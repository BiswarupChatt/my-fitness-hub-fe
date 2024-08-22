import { Helmet } from "react-helmet"
import ClientNutritionPlan from "../../components/client/ClientNutritionPlan"
export default function Nutrition() {
    return (
        <>
            <Helmet>
                <title>Nutrition</title>
            </Helmet>
            <h2>Nutrition Screen</h2>
            <ClientNutritionPlan/>
        </>

    )
    
}