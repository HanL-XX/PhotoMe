import React, { useState, useEffect, useMemo, useReducer } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './AuthStack'
import MainScreen from './MainScreen'
import { ActivityIndicator } from "react-native" //loading page
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { MAIN_URL } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, Login, Logout } from '../redux/actions/auth'

const Stack = createStackNavigator();

export default function Routes() {
    const authData = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const authContext = useMemo(() => ({ //only run once
        signIn: async (data, userToken) => {
            await axios({
                method: 'POST',
                url: `${MAIN_URL}/api/login`,
                data: data,
                headers: { 'Content-Type': 'application/json' }
            })
                .then(async (response) => {
                    //Dispatch action 
                    const action = Login(response.data)
                    const token = getToken(response.data.token)

                    //get value token from redux
                    userToken = await token.payload //token user to save login in AsyncStorage

                    dispatch(action)
                    // dispatch(getToken)
                })
                .catch(err => {
                    console.log(`ERROR!: ${err}`)
                })
            if (data) {
                try {
                    await AsyncStorage.setItem('userToken_Key', userToken)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        signOut: async () => {

            try {
                await AsyncStorage.removeItem('userToken_Key')

            } catch (error) {
                console.log(error)
            }
            dispatch(Logout(null))
            dispatch(getToken(null))
        },
    }), []) //run only once when refresh app

    useEffect(() => {
        const seconds = Math.floor(Math.random() * 1300) + 800
        // console.log(seconds)
        setTimeout(async () => {
            let userToken = null
            try {
                userToken = await AsyncStorage.getItem('userToken_Key')
            } catch (error) {
                console.log(error)
            }
            dispatch(getToken(userToken))
        }, seconds);

    }, [])

    //effect loading page
    if (authData.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    {
                        authData.userToken !== null ?
                            (
                                //MainScreen show
                                <Stack.Screen
                                    name="MainScreen"
                                    component={MainScreen}
                                />
                            ) :
                            (
                                //LoginScreen & RegisterScreen show
                                <Stack.Screen
                                    name="AutoStack"
                                    component={AuthStack} />
                            )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>

    )
}
