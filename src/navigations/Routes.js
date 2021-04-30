import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './AuthStack'
import MainScreen from './MainScreen'

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="AutoStack"
                    component={AuthStack} />
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
