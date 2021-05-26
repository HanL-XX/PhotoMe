import { GET_TOKEN, LOGIN, LOGOUT, REGISTER } from '../actionTypes'

const initialLoginState = {
    //object
    isLoading: true,
    name: null,
    userName: null,
    userToken: null,
}

const authReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state,
                userToken: action.payload,
                isLoading: false
            };
        case LOGIN: {

            return {
                ...state,
                userName: action.payload.id,
                userToken: action.payload.token,
                isLoading: false,
            };
        }

        case LOGOUT:
            return {
                ...state,
                userName: null,
                userToken: null,
                isLoading: false,
            };
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