import AddClientNutrition from "../addClientNutrition/AddClientNutrition"
import { useEffect } from "react";
// import { useParams } from "react-router-dom"
import axios from "../../../services/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { startGetNutritionPlan } from "../../../services/redux/action/nutritionPlan-action";

export default function ClientNutrition({ clientId }) {

    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    console.log("client id in Client Nutrition", clientId)

    useEffect(() => {
        if (clientId && token) {
            dispatch(startGetNutritionPlan(clientId, token))
        }
    }, [clientId, token])

    console.log('Client ID in ClientNutrition:', clientId)

    return (
        <>
            <AddClientNutrition clientId={clientId} />
        </>
    )
}