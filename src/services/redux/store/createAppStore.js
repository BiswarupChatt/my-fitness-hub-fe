import { configureStore } from "@reduxjs/toolkit";

import clientReducer from "../reducers/client-reducer";

const createAppStore = () => {
    return configureStore({
        reducer: {
            client: clientReducer
        }
    })
}

export default createAppStore