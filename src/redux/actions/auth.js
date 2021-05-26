import { GET_TOKEN, LOGIN, LOGOUT, REGISTER } from '../actionTypes'


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