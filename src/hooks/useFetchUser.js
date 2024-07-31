import { useEffect } from "react";
import axios from "../services/api/axios";
import { useAuth } from "../services/context/AuthContext";
import { errorToast } from "../utils/toastify";

export const useFetchUser = () => {
    const { user, dispatch } = useAuth()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const getAccountResponse = await axios.get('/users/account', {
                        headers: {
                            Authorization: token
                        }
                    })
                    const account = getAccountResponse.data

                    let url
                    if (account.role === 'coach' || account.role === 'admin') {
                        url = '/coach'
                    } else {
                        url = '/client'
                    }

                    const getProfileResponse = await axios.get(url, {
                        headers: {
                            Authorization: token
                        }
                    })
                    const profile = getProfileResponse.data

                    // setTimeout(() => {
                        dispatch({ type: 'LOGIN', payload: { account: account, profile: profile } })
                    // }, 2000);
                } catch (err) {
                    localStorage.removeItem('token')
                    errorToast("Unable to login please try again")
                }
            })();
        }
    }, [])

    return user
}