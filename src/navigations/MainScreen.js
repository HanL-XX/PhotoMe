import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack'
import TabComponents from '../components/TabComponents'

import HomeScreen from '../screens/tabs/HomeScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import ProfileUserScreen from '../screens/tabs/ProfileUserScreen'
import NotificationScreen from '../screens/tabs/NotificationScreen'
import SearchScreen from '../screens/tabs/SearchScreen'
import DiscoverScreen from '../screens/tabs/DiscoverScreen'
import MessageScreen from '../screens/tabs/MessageScreen'
import ChatScreen from '../screens/tabs/ChatScreen'
import InfoChatScreen from '../screens/tabs/InfoChatScreen'
import EditPersonalProfile from '../screens/tabs/EditPersonalProfile'
import PostMind from '../screens/tabs/PostMind'
import PostCard from '../components/PostCard'
import PostScreen from '../screens/tabs/PostScreen'
//
const Tab = createBottomTabNavigator();

//window screen
const Stack = createStackNavigator()

const MainStackScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Discover"
            // activeColor="#0568c5"
            barStyle={{ backgroundColor: '#fff' }}
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 10,
                    right: 10,
                    // elevation: 0,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    elevation: 0,
                    height: 75,
                    paddingTop: 15,
                    paddingBottom: 0,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    // tabBarIcon: ({ color }) => (
                    //     <MaterialCommunityIcons name="home" color={color} size={32} />
                    // ),
                    tabBarButton: (props) => <TabComponents label="home" {...props} />,
                }}
            />
            <Tab.Screen
                name="Discover"
                component={DiscoverScreen}
                options={{
                    tabBarLabel: 'Discover',
                    // tabBarIcon: ({ color }) => (
                    //     <MaterialCommunityIcons name="compass" color={color} size={32} />
                    // ),
                    tabBarButton: (props) => <TabComponents label="compass" {...props} />,
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarLabel: 'Notification',
                    // tabBarIcon: ({ color }) => (
                    //     <MaterialCommunityIcons name="bell" color={color} size={32} />
                    // ),
                    tabBarButton: (props) => <TabComponents label="notification" {...props} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    // tabBarIcon: ({ color }) => (
                    //     <Icon name="search" color={color} size={25} />
                    // ),
                    tabBarButton: (props) => <TabComponents label="search" {...props} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    // tabBarIcon: ({ color }) => (
                    //     <MaterialCommunityIcons name="account" color={color} size={32} />
                    // ),
                    tabBarButton: (props) => <TabComponents label="account" {...props} />,
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

                    headerShown: false
                })} />

        </Stack.Navigator>
    )
}
