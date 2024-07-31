import { SET_CLIENT, ERROR } from "../action/client-action"

const initialState = {
    data: null,
    error: null
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLIENT: {
            return {
                ...state, data: action.payload, error: null
            }
        }
        case ERROR: {
            return {
                ...state, data: null, error: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default clientReducer