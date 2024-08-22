import axios from "../../api/axios"

export const MEAL_PLAN = 'MEAL_PLAN'


export const startGetMealPlan = (clientId, token, user) => {
    return async (dispatch) => {
        try {
            console.log(2)
            const url = user.account.role === 'client' ? `/meal-plan` : `/meal-plan/${clientId}`

            const response = await axios.get(url, {
                headers: {
                    Authorization: token
                }
            })
            const result = response.data
            console.log("startGetMealPlan", result)
            dispatch(setMealPlan(result))
        } catch (err) {
            console.log("startGetMealPlan", err)
            console.log(err)
        }
    }
}

export const setMealPlan = (mealPlanItem) => {
    return ({ type: MEAL_PLAN, payload: mealPlanItem })
}
