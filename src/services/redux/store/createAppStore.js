import { configureStore } from "@reduxjs/toolkit";

import clientReducer from "../reducers/client-reducer";
import foodItemReducer from "../reducers/foodItem-reducer";

const createAppStore = () => {
    return configureStore({
        reducer: {
            client: clientReducer,
            foodItem: foodItemReducer
        }
    })
}

export default createAppStore