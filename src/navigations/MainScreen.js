import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/tabs/HomeScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import NotificationScreen from '../screens/tabs/NotificationScreen'
import MessageScreen from '../screens/tabs/MessageScreen'
import ChatScreen from '../screens/tabs/ChatScreen'
import InfoChatScreen from '../screens/tabs/InfoChatScreen'
//
const Tab = createMaterialBottomTabNavigator();

//window screen
const Stack = createStackNavigator()
// const HomeStackScreen = () => {
//     return (
//         <Stack.Navigator initialRouteName="Home">
//             <Stack.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={{
//                     headerShown: false
//                 }} />
//             <Stack.Screen
//                 name="Message"
//                 component={MessageScreen}
//                 options={{
//                     headerShown: false
//                 }} />
//             <Stack.Screen
//                 name="Chat"
//                 component={ChatScreen}
//                 options={{ headerShown: false }} />
//         </Stack.Navigator>
//     )
// }

const MainStackScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#4867aa"
            barStyle={{ backgroundColor: '#fff' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: 'Updates',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={28} />
                    ),
                }}
            />
        </Tab.Navigator>
    )

}

export default function MainScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainScreen"
                component={MainStackScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen
                name='Message'
                component={MessageScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen
                name='Chat'
                component={ChatScreen}
                options={({ route }) => ({
                    title: route.params.userName,
                    headerBackTitleVisible: false,
                    headerShown: false
                })} />
            <Stack.Screen
                name='InfoChat'
                component={InfoChatScreen}
                options={({ route }) => ({

                    headerShown: false
                })} />
        </Stack.Navigator>
    )
}
