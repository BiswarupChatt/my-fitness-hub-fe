import { MEAL_PLAN, } from "../action/mealPlan-action"

const initialState = {
    data: null,
}

const mealPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEAL_PLAN: {
            return {
                ...state,
                data: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default mealPlanReducer;
