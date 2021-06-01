import React, { useState, useEffect, useMemo, useReducer } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './AuthStack'
import MainScreen from './MainScreen'
import { ActivityIndicator } from "react-native" //loading page
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { MAIN_URL } from '../config'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'

import { useDispatch, useSelector } from 'react-redux'
import { getUser, Login, Logout } from '../redux/actions/auth'

const Stack = createStackNavigator();

export default function Routes() {
    const authData = useSelector(state => state.auth) //get auth from RootReducer
    const dispatch = useDispatch()
    console.log(authData)

    const authContext = useMemo(() => ({ //only run once
        signIn: async (data, userToken, userName, userId) => {
            await axios({
                method: 'POST',
                url: `${MAIN_URL}/api/login`,
                data: data, //username && password
                headers: { 'Content-Type': 'application/json' }
            })
                .then(async (response) => {
                    const user = {
                        id: response.data.user.id,
                        email: response.data.user.email,
                        name: response.data.user.name,
                        token: response.data.token,
                    }

                    const action = Login(user)
                    dispatch(action)

                    //get value id, name, token from redux
                    userToken = await action.payload.token
                    userName = action.payload.name
                    userId = action.payload.id

                    // console.log(userName, userId)
                })
                .catch(err => {
                    console.log(`ERROR!: ${err}`)
                })
            if (data) {
                try {
                    await AsyncStorage.setItem('userToken_Key', userToken)
                    await AsyncStorage.setItem('userName_Key', userName)
                    await AsyncStorage.setItem('userId_Key', userId)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken_Key')
                await AsyncStorage.removeItem('userName_Key')
                await AsyncStorage.removeItem('userId_Key')

            } catch (error) {
                console.log(error)
            }

            dispatch(Logout(null))
            dispatch(getUser(null, null, null))
        },
    }), []) //run only once when refresh app

    useEffect(() => {
        const seconds = Math.floor(Math.random() * 1300) + 800
        // console.log(seconds)
        setTimeout(async () => {
            const user = {
                userToken: null,
                userName: null,
                userId: null,
            }
            try {
                user.userToken = await AsyncStorage.getItem('userToken_Key')
                user.userName = await AsyncStorage.getItem('userName_Key')
                user.userId = await AsyncStorage.getItem('userId_Key')
            } catch (error) {
                console.log(error)
            }
            dispatch(getUser(user))
            // console.log(dispatch(getUser(user)))
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
    // console.log("??? " + authData.userToken)
    // console.log("!!!! " + authData.userName)
    return (
        <AuthContext.Provider value={{ authContext, name: authData.userName }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    {
                        authData.userToken !== null ?
                            (
                                //MainScreen show
                                <Stack.Screen name="MainScreen">
                                    {() => (
                                        <UserContext.Provider value={{ id: authData.userId }}>
                                            <MainScreen />
                                        </UserContext.Provider>
                                    )}
                                </Stack.Screen>
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
        </AuthContext.Provider >

    )
}
