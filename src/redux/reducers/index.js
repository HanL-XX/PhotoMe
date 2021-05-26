import { useReducer } from 'react'
import authReducer from './auth'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    auth: authReducer,
})