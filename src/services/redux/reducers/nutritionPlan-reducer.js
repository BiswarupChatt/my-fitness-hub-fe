import { NUTRITION_PLAN, ADD_MEAL_PLAN, UPDATE_MEAL_PLAN, DELETE_MEAL_PLAN } from "../action/nutritionPlan-action"

const initialState = {
    data: null,
}

const nutritionPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case NUTRITION_PLAN: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case ADD_MEAL_PLAN: {
            return {
                ...state,
                data: {
                    ...state.data,
                    mealPlans: [...(state.data?.mealPlans || []), action.payload],
                },
            };
        }
        case DELETE_MEAL_PLAN: {
            return {
                ...state,
                data: {
                    ...state.data,
                    mealPlans: state.data.mealPlans.filter((_, i) => i !== action.payload),
                },
            };
        }
        case UPDATE_MEAL_PLAN: {
            const { index, updateMealPlan } = action.payload;
            const updatedMealPlans = [...(state.data?.mealPlans || [])];
            updatedMealPlans[index] = updateMealPlan;

            return {
                ...state,
                data: {
                    ...state.data,
                    mealPlans: updatedMealPlans,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default nutritionPlanReducer;
