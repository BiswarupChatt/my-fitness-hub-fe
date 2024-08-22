import axios from "../../api/axios"

export const MEAL_PLAN = 'MEAL_PLAN'


export const startGetMealPlan = (clientId, token) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/meal-plan/${clientId}`, {
                headers: {
                    Authorization: token
                }
            })
            const result = response.data
            // console.log("startGetMealPlan", result)
            dispatch(setMealPlan(result))
        } catch (err) {
            console.log(err)
        }
    }
}

export const setMealPlan = (mealPlanItem) => {
    return ({ type: MEAL_PLAN, payload: mealPlanItem })
}
