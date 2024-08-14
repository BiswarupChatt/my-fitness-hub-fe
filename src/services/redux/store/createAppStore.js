import { configureStore } from "@reduxjs/toolkit";

import clientReducer from "../reducers/client-reducer"
import foodItemReducer from "../reducers/foodItem-reducer"
import nutritionPlanReducer from "../reducers/nutritionPlan-reducer";

const createAppStore = () => {
    return configureStore({
        reducer: {
            client: clientReducer,
            foodItem: foodItemReducer,
            nutritionPlan: nutritionPlanReducer
        }
    })
}

export default createAppStore