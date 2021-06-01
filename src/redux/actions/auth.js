import { GET_TOKEN, GET_USER, LOGIN, LOGOUT, REGISTER } from '../actionTypes'

export const getUser = (data) => ({
    type: GET_USER,
    payload: data,
})

export const getToken = (token) => ({
    type: GET_TOKEN,
    payload: token,
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