import { FOOD_ITEM } from "../action/foodItem-action";

const initialState = {
    data: null
}

const foodItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOOD_ITEM: {
            return { ...state, data: action.payload }
        }
        default: {
            return state
        }
    }
}

export default foodItemReducer