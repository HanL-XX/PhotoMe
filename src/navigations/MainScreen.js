import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'

import HomeScreen from '../screens/tabs/HomeScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import ProfileUserScreen from '../screens/tabs/ProfileUserScreen'
import NotificationScreen from '../screens/tabs/NotificationScreen'
import SearchScreen from '../screens/tabs/SearchScreen'
import MessageScreen from '../screens/tabs/MessageScreen'
import ChatScreen from '../screens/tabs/ChatScreen'
import InfoChatScreen from '../screens/tabs/InfoChatScreen'
import EditPersonalProfile from '../screens/tabs/EditPersonalProfile'
import PostMind from '../screens/tabs/PostMind'
import PostCard from '../components/PostCard'
import PostScreen from '../screens/tabs/PostScreen'
import CommentScreen from '../screens/tabs/CommentScreen'
//
const Tab = createMaterialBottomTabNavigator();

//window screen
const Stack = createStackNavigator()

const MainStackScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#005aad"
            barStyle={{ backgroundColor: '#fff' }}
            animation='fade'
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={27} />
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS

                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={27} />
                    ),
                    tabBarBadge: null,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Icon name="search" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={27} />
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid

                }}
            />

        </Tab.Navigator>
    )

}

export default function MainScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
            }}
            animation='fade'
        >
            <Stack.Screen
                name="MainScreen"
                component={MainStackScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen
                name="ProfileUserScreen"
                component={ProfileUserScreen}
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
            <Stack.Screen
                name='EditPersonalProfile'
                component={EditPersonalProfile}
                options={({ route }) => ({

                    headerShown: false
                })} />
            <Stack.Screen
                name='PostMind'
                component={PostMind}
                options={({ route }) => ({

                    headerShown: false
                })} />
            <Stack.Screen
                name='PostCard'
                component={PostCard}
                options={({ route }) => ({

                    headerShown: false
                })} />
            <Stack.Screen
                name='Post'
                component={PostScreen}
                options={({ route }) => ({
                    headerShown: false,
                    // cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                })} />
            <Stack.Screen
                name='Comment'
                component={CommentScreen}
                options={({ route }) => ({
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
                })} />
        </Stack.Navigator>
    )
}
