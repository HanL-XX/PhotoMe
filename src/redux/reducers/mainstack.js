import { PROFILE_USER } from '../actionTypes'

const initialMainStackState = {
    //object
    userId: null,
    userName: null,
}

const mainStackReducer = (state = initialMainStackState, action) => {
    switch (action.type) {
        case PROFILE_USER: {
            return {
                ...state,
                userId: action.payload.id,
                userName: action.payload.name,
            }
        }

        default:
            return state;
    }
}

export default mainStackReducer