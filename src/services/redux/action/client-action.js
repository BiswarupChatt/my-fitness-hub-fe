import axios from "../../api/axios"

export const SET_CLIENT = "SET_CLIENT"
export const ERROR = 'ERROR'

export const startGetClient = (userId, token) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/coach/getSingleClient/${userId}`, {
                headers: {
                    Authorization: token
                }
            })
            const result = response.data
            dispatch(setClient(result))
        } catch (err) {
            const errorPayload = err.response ? err.response.data : { message: err.message }
            dispatch(setError(errorPayload))
        }
    }
}
export const setError = (errorPayload) => {
    return { type: ERROR, payload: errorPayload }
}
export const setClient = (client) => {
    return { type: SET_CLIENT, payload: client }
}