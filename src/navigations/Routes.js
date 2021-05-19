import React, { useState, useEffect, useMemo, useReducer } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './AuthStack'
import MainScreen from './MainScreen'
import { ActivityIndicator } from "react-native" //loading page
import { View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../components/context'

const Stack = createStackNavigator();

export default function Routes() {
    // const [isLoading, setIsLoading] = useState(true)
    // const [userToken, setUserToken] = useState(null)
    const initialLoginState = {
        //object
        isLoading: true,
        userName: null,
        userToken: null,
    }
    //REACT HOOKS useContext & useReducer
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'GET_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER': //same LOGIN
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            default:
                throw new Error()
        }
    }

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)


    const authContext = useMemo(() => ({
        signIn: async (data, userToken) => { //data: email & password, userToken: token
            // console.log(data)
            // console.log(data.email)
            console.log("!TOKEN: " + userToken)
            console.log(loginState.isLoading)
            if (data) {
                try {
                    await AsyncStorage.setItem('userToken_Key', userToken)
                } catch (error) {
                    console.log(error)
                }
                dispatch({ type: 'LOGIN', id: data.email, token: userToken })
            }
        },
        signOut: async () => {
            // setUserToken(null)
            // setIsLoading(false)
            // console.log(userToken)
            try {
                await AsyncStorage.removeItem('userToken_Key')
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'LOGOUT' })
        },
    }), []) //run only once when refresh app

    useEffect(() => {
        setTimeout(async () => {
            //loading this page
            loginState.isLoading = false

            let userToken
            userToken = null
            console.log(`User Token: ${userToken}`)
            try {
                userToken = await AsyncStorage.getItem('userToken_Key')
                //console.log("????: " + userToken)
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'GET_TOKEN', token: userToken })
        }, 800);

    }, [])

    //effect loading page
    if (loginState.isLoading) {
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
                        loginState.userToken !== null ?
                            (
                                //MainScreen show
                                <Stack.Screen
                                    name="MainScreen"
                                    component={MainScreen} />

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
