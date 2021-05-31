import { GET_USER, GET_TOKEN, LOGIN, LOGOUT, REGISTER } from '../actionTypes'

const initialLoginState = {
    //object
    isLoading: true, // loading page
    userId: null,
    email: null,
    userName: null,
    userToken: null,
}

const authReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case GET_USER: {
            return {
                ...state,
                userId: action.payload.userId,
                userName: action.payload.userName,
                userToken: action.payload.userToken,
                isLoading: false
            };
        }
        case GET_TOKEN:
            return {
                ...state,
                userToken: action.payload,
                isLoading: false
            };
        case LOGIN: {
            return {
                ...state,
                userId: action.payload.id,
                email: action.payload.email,
                userName: action.payload.name,
                userToken: action.payload.token,
                isLoading: false,
            };
        }

        case LOGOUT:
            return {
                ...state,
                userId: null,
                email: null,
                userName: null,
                userToken: null,
                isLoading: false,
            };
        //don't finish REGISTER
        case REGISTER: //same LOGIN
            return {
                ...state,
                userName: action.id,
                userToken: action.token,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default authReducer