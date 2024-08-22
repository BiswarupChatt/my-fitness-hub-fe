import { configureStore } from "@reduxjs/toolkit";

import clientReducer from "../reducers/client-reducer"
import foodItemReducer from "../reducers/foodItem-reducer"
import nutritionPlanReducer from "../reducers/mealPlan-reducer";

const createAppStore = () => {
    return configureStore({
        reducer: {
            client: clientReducer,
            foodItem: foodItemReducer,
            mealPlan: nutritionPlanReducer
        }
    })
}

export default createAppStore