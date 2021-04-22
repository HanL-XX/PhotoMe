import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import SignUpScreen from "../screens/RegisterScreen"
import { View } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MainScreen from '../screens/MainScreen'

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ header: () => null }} />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: "#f9fafd",
                        shadowColor: "#f9fafd",
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <View>
                            <FontAwesome.Button
                                name="long-arrow-left"
                                size={25}
                                backgroundColor="#f9fafd"
                                color="#333"
                                onPress={() => navigation.navigate("Login")} />
                        </View>
                    )
                })} />
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ header: () => null }}
                options={({ navigation }) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: "#f9fafd",
                        shadowColor: "#f9fafd",
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <View>
                            <FontAwesome.Button
                                name="long-arrow-left"
                                size={25}
                                backgroundColor="#f9fafd"
                                color="#333"
                                onPress={() => navigation.navigate("Login")} />
                        </View>
                    )
                })} />
        </Stack.Navigator>
    )
}
