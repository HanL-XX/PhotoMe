import { useReducer } from 'react'
import authReducer from './auth'
import mainStack from './mainstack'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    auth: authReducer,
})