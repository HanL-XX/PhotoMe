import { PROFILE_USER } from '../actionTypes'

export const getProfileUser = (data) => ({
    type: PROFILE_USER,
    payload: data,
})