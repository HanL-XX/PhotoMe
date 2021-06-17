import * as api from '../../api'
import { GET_USER, LOGIN, LOGOUT, REGISTER, FETCH_PROFILE } from '../actionTypes'

export const getUser = (data) => ({
    type: GET_USER,
    payload: data,
})

export const Login = (data) => ({
    type: LOGIN,
    payload: data,
})

export const Logout = (token) => {
    return {
        type: LOGOUT,
        payload: token,
    }
}

export const Register = (data) => {
    return {
        type: REGISTER,
        payload: data,
    }
}


export const fetchProfiles = () => async (dispatch) => {
    try {
        const { data } = api.fetchProfile()
        console.log(data)
        await dispatch({ type: FETCH_PROFILE, payload: data })
    } catch (error) {
        console.log(error)
    }

}