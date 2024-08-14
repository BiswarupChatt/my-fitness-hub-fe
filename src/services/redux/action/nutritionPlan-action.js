import axios from "../../api/axios"

export const NUTRITION_PLAN = 'NUTRITION_PLAN'

export const startGetNutritionPlan = (clientId, token) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/nutrition-plan/${clientId}`, {
                headers: {
                    Authorization: token
                }
            })
            const result = response.data
            console.log("result",result)
            dispatch(setNutritionPlan(result))
        } catch (err) {
            console.log(err)
        }
    }
}

export const setNutritionPlan = (nutritionPlanItem) => {
    return ({ type: NUTRITION_PLAN, payload: nutritionPlanItem })
}