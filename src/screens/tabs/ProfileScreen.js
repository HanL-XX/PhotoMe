import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import {
    SafeAreaView,
    Container,
    IconContainer,
    UserImgContainer,
    UserImg,
    UserName,
    Description,
    StatsContainer,
    Stat,
    StatAmount,
    StatTitle,
    EditProfile,
    EditProfileText,
} from '../../styles/ProfileStyle'
import PostCard from '../../components/PostCard'
import DrawerProfileScreen from '../tabs/DrawerProfileScreen'

const Drawer = createDrawerNavigator(); // create Drawer Navigator

const time = new Date().toISOString(); //get Date to post Status
//test DATA
const Posts = [
    {
        id: '1',
        name: 'Phạm Vũ Lê Minh',
        userName: 'phamvuleminh',
        userImg: require('../../assets/images/user1.jpg'),
        postTime: '2021-05-04T03:16:34.820Z',
        postText: `Hi, I'm a developer`,
        postImg: require('../../assets/images/postImg/post1.jpg'),
        liked: 'false',
        likes: '10',
        comments: '5',
        shares: '5',

    },
    {
        id: '2',
        name: 'Hà Nhật Linh',
        userName: 'hnlinh',
        userImg: require('../../assets/images/user2.png'),
        postTime: time,
        postText: `Perfect Image for Bird!`,
        postImg: require('../../assets/images/postImg/post2.jpg'),
        liked: 'true',
        likes: '1',
        comments: '14',
        shares: '5',

    },
    {
        id: '3',
        name: 'Group',
        userImg: require('../../assets/images/user3.jpg'),
        postTime: time,
        postText: `This is a first comment in group!!`,
        postImg: 'none',
        liked: 'false',
        likes: '48',
        comments: '2',
        shares: '5',

    },
    {
        id: '4',
        name: 'Phạm Vũ Lê Minh',
        userName: 'phamvuleminh',
        userImg: require('../../assets/images/user1.jpg'),
        postTime: '2021-05-10T03:16:34.820Z',
        postText: `This is a second post!!`,
        postImg: require('../../assets/images/postImg/post2.jpg'),
        liked: 'false',
        likes: '1K',
        comments: '52',
        shares: '5',

    },
]

//change Profile in here!
const ProfileStackScreen = ({ navigation }) => {
    const [name, setName] = useState('Phạm Vũ Lê Minh')
    const [userName, setUserName] = useState('phamvuleminh')
    return (
        <SafeAreaView>
            <Container
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} //must be code there!
                showVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <IconContainer>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather
                            name="menu"
                            size={28}
                            style={{ flex: 1 }}
                        />
                    </TouchableOpacity>
                    <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        style={styles.textInput} value={userName} defaultValue={userName} />
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather
                            name="more-vertical"
                            size={28}
                            style={{ flex: 1, textAlign: 'right' }} />
                    </TouchableOpacity>

                </IconContainer>

                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <UserImgContainer>
                        <UserImg source={require("../../assets/images/user1.jpg")} />
                    </UserImgContainer>
                    <UserName
                        value={name}
                        defaultValue={name}
                        editable={false}
                        selectTextOnFocus={false} />
                    <Description>IT - Software Engineering</Description>
                </View>

                <StatsContainer>
                    <Stat>
                        <StatAmount>21</StatAmount>
                        <StatTitle>Posts</StatTitle>
                    </Stat>
                    <Stat>
                        <StatAmount>1K</StatAmount>
                        <StatTitle>Followers</StatTitle>
                    </Stat>
                    <Stat>
                        <StatAmount>305</StatAmount>
                        <StatTitle>Following</StatTitle>
                    </Stat>
                </StatsContainer>

                <EditProfile>
                    <EditProfileText onPress={() => navigation.navigate('EditPersonalProfile', { name: name })}>Edit Profile</EditProfileText>
                </EditProfile>
                {Posts.map((item, index) => {
                    if (item.userName === userName) {
                        return <View key={item.id} style={styles.viewDeletePost}>
                            <PostCard item={item} />
                        </View>
                    }
                })}
            </Container>

        </SafeAreaView>
    )
}

export default function ProfileScreen({ navigation }) {
    // const [posts, setPosts] = useState({ Posts })

    return (

        <Drawer.Navigator drawerContent={props => <DrawerProfileScreen {...props} />}>
            <Drawer.Screen
                name="ProfileStackScreen" component={ProfileStackScreen} />
        </Drawer.Navigator>

    )
}

const styles = StyleSheet.create({
    viewDeletePost: {
        width: '100%',
        alignItems: 'center',
    },
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500'
    }
})