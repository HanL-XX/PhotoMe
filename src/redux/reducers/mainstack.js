import { PROFILE_USER } from '../actionTypes'

const initialMainStackState = {
    //object
    id_User: null,
    avatar: null,
    follow: 0,
    following: 0,
    post: 0,
    name: null,
}

const mainStackReducer = (state = initialMainStackState, action) => {
    switch (action.type) {
        case PROFILE_USER: {
            return {
                ...state,
                id_User: action.payload.id_User,
                avatar: action.payload.avatar,
                follow: action.payload.follow,
                following: action.payload.following,
                post: action.payload.post,
                name: action.payload.name,
            }
        }

        default:
            return state;
    }
}

export default mainStackReducer