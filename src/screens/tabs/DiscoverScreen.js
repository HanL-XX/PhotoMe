import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import {
    SafeAreaView,
    Container, HeaderBar,
    UserInfo, UserImg,
    FormInput, FormInputText,
} from '../../styles/DiscoverStyle'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import PeoplePostCard from './PeopleDiscoverScreen'
import PhotoPostCard from './PhotoDiscoverScreen';

const Tab = createMaterialTopTabNavigator()

const dataImg = {
    source: {
        avatar: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2F1624704851844.jpg?alt=media&token=cc3735ab-212a-4082-b03b-8dcc0630c0db'
    }
}


export default function DiscoverScreen() {
    const [isSelected, setIsSelected] = useState(0)
    const selectedTab = (tabIndex) => {
        setIsSelected(tabIndex)
    }
    return (
        <SafeAreaView>
            <Container>
                <HeaderBar>
                    <UserInfo activeOpacity={1}>
                        <UserImg source={{ uri: dataImg.source.avatar }} />
                    </UserInfo>
                    <FormInput>
                        <EvilIcons
                            size={24}
                            name="search"
                            style={{ color: "#444" }}
                        />
                        <FormInputText
                            placeholder="Search PhotoMe" />
                    </FormInput>
                </HeaderBar>
                <View style={{ flex: 1, backgroundColor: 'red' }}>
                    <Tab.Navigator
                        initialRouteName="Photos">
                        <Tab.Screen
                            name="Photos"
                            component={PhotoPostCard} />
                        <Tab.Screen
                            name="People"
                            component={PeoplePostCard} />

                    </Tab.Navigator>
                </View>
            </Container>
        </SafeAreaView >
    )
}
