import MealPlan from "../../../components/coach/addClientNutrition/MealPlan"
import axios from "../../api/axios"

export const NUTRITION_PLAN = 'NUTRITION_PLAN'
export const ADD_MEAL_PLAN = 'ADD_MEAL_PLAN'
export const DELETE_MEAL_PLAN = 'DELETE_MEAL_PLAN'
export const UPDATE_MEAL_PLAN = 'UPDATE_MEAL_PLAN'

export const startGetNutritionPlan = (clientId, token) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/nutrition-plan/${clientId}`, {
                headers: {
                    Authorization: token
                }
            })
            const result = response.data
            console.log("startGetNutritionPlan", result)
            dispatch(setNutritionPlan(result))
        } catch (err) {
            console.log(err)
        }
    }
}

export const setNutritionPlan = (nutritionPlanItem) => {
    return ({ type: NUTRITION_PLAN, payload: nutritionPlanItem })
}

export const addMealPlan = (mealPLan) => {
    return (dispatch, getState) => {
        try {

        } catch (err) {

        }
    }
}

export const deleteMealPlan = (index) => {
    return ({ type: DELETE_MEAL_PLAN, payload: index })
}

export const updateMealPlan = (index, updateMealPlan) => {
    return ({ type: UPDATE_MEAL_PLAN, payload: { index, updateMealPlan } })
}