import { NUTRITION_PLAN } from "../action/nutritionPlan-action"

const initialState = {
    data: null,
}

const nutritionPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case NUTRITION_PLAN: {
            return {
                ...state, data: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default nutritionPlanReducer