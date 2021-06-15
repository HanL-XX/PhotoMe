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
import { MainContext } from '../context/MainContext'

import { useDispatch, useSelector } from 'react-redux'
import { getUser, Login, Logout, Register } from '../redux/actions/auth'
import { getProfileUser } from '../redux/actions/mainstack'

const Stack = createStackNavigator();

export default function Routes() {
    const authData = useSelector(state => state.auth) //get auth from RootReducer
    const mainData = useSelector(state => state.mainStack)
    const dispatch = useDispatch()
    const [user1, setUser1] = useState({
        id_User: '',
        name: '',
        avatar: '',
        sex: '',
    })

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
                    userId = action.payload.id
                })
                .catch(err => {
                    console.log(`ERROR!: ${err}`)
                })
            if (data) {
                try {
                    await AsyncStorage.setItem('userToken_Key', userToken)
                    // await AsyncStorage.setItem('userName_Key', userName)
                    await AsyncStorage.setItem('userId_Key', userId)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken_Key')
                // await AsyncStorage.removeItem('userName_Key')
                await AsyncStorage.removeItem('userId_Key')

            } catch (error) {
                console.log(error)
            }

            dispatch(Logout(null))
            // dispatch(getUser(null))
        },
        register: (user) => { //name, email, password, sex
            axios({
                method: 'POST',
                url: `${MAIN_URL}/api/user`,
                data: user, //username && password
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => {
                    // console.log(response)
                    const action = Register(user)
                    dispatch(action)
                    // setUser1({ ...user1, id_User: response.data.id_User, name: response.data.name, sex: response.data.sex })
                    // console.log(user1)
                    return response;
                })
                .then(response => {
                    // console.log(response)
                    axios({
                        method: 'POST',
                        url: `${MAIN_URL}/api/profile`,
                        data: {
                            id_User: response.data.user.id,
                            name: response.data.user.name,
                            sex: response.data.user.sex,
                        },
                        headers: { 'Content-Type': 'application/json' }
                    }).then(res).catch(err => console.log(err))
                })
                .catch(err => {
                    console.log(`ERROR!: ${err}`)
                })


        }
    }), [dispatch]) //run only once when refresh app

    const mainContext = useMemo(() => ({
        updateProfile: async (data) => {
            await axios({
                method: 'POST',
                url: `${MAIN_URL}/api/profile/updateprofile`,
                data: data, //img, name, intro, sex, iconSex, 
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                    // console.log(response)
                })
                .catch(err => console.log(err))
        }
    }), [])

    useEffect(async () => {
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
                // user.userName = await AsyncStorage.getItem('userName_Key')
                user.userId = await AsyncStorage.getItem('userId_Key')

                // console.log(id)
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

    return (
        <AuthContext.Provider value={{ authContext, data: authData }}>
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
                                        <MainContext.Provider value={{ mainContext, dataProfile: mainData }}>
                                            <MainScreen />
                                        </MainContext.Provider>
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
