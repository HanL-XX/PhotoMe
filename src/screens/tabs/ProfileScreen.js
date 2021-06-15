import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
    SafeAreaView,
    Container,
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
import AnimatedBottomSheet from '../../components/AnimatedBottomSheet'
import axios from 'axios';
import { MAIN_URL } from '../../config';
import AsyncStorage from '@react-native-community/async-storage'

const Drawer = createDrawerNavigator(); // create Drawer Navigator

const time = new Date().toISOString(); //get Date to post Status
//test DATA
const Posts = [
    {
        id: '1',
        userName: 'Minh',
        userImg: require('../../assets/images/user1.jpg'),
        postTime: '2021-05-04T03:16:34.820Z',
        postText: `Hi, I'm a developer`,
        postImg: require('../../assets/images/postImg/post1.jpg'),
        liked: false,
        likes: '10',
        comments: '5',
        saves: '5',

    },
    {
        id: '2',
        userName: 'Linh',
        userImg: require('../../assets/images/user2.png'),
        postTime: time,
        postText: `Perfect Image for Bird!`,
        postImg: require('../../assets/images/postImg/post2.jpg'),
        liked: true,
        likes: '1',
        comments: '14',
        saves: '5',

    },
    {
        id: '3',
        userName: 'Group',
        userImg: require('../../assets/images/user3.jpg'),
        postTime: time,
        postText: `This is a first comment in group!!`,
        postImg: 'none',
        liked: false,
        likes: '48',
        comments: '2',
        saves: '5',

    },
    {
        id: '4',
        userName: 'Minh',
        userImg: require('../../assets/images/user1.jpg'),
        postTime: '2021-05-10T03:16:34.820Z',
        postText: `This is a second post!!`,
        postImg: require('../../assets/images/postImg/post2.jpg'),
        liked: true,
        likes: '1K',
        comments: '52',
        saves: '5',

    },
]

//change Profile in here!
const ProfileStackScreen = ({ navigation }) => {
    const [user, setUser] = useState({
        id: null,
        name: null,
        avatar: null,
        follow: null,
        following: null,
        post: null,
    })

    useEffect(async () => {
        const id = await AsyncStorage.getItem('userId_Key');
        try {
            axios({
                method: 'GET',
                url: `${MAIN_URL}/api/profile`,
                params: {
                    id_User: id
                }
            })
                .then(response => {
                    setUser({
                        id: response.data.profile[0]._id,
                        name: response.data.profile[0].name,
                        avatar: response.data.profile[0].avatar,
                        follow: response.data.profile[0].follow,
                        following: response.data.profile[0].following,
                        post: response.data.profile[0].post,
                    })
                    console.log(response.data.profile[0].avatar)
                })
                .catch(err => console.log(err.msg))
        } catch (error) {
            console.log(error)
        }
    }, [])
    // const [countPost, setCountPost] = useState(0)
    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);
    const onOpenBottomSheet = () => {
        modalizeRef.current?.open();
    }

    //Refresh Screen
    const [refreshing, setRefreshing] = useState(false);
    const [intro, setIntro] = useState('IT-DEV')
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    })

    return (
        <SafeAreaView>
            <Container
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} //must be code there!
                showVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <UserImgContainer>
                        <UserImg source={{ uri: user.avatar }} />
                    </UserImgContainer>
                    <UserName
                        value={user.name}
                        defaultValue={user.name}
                        editable={false}
                        selectTextOnFocus={false} />
                    <Description numberOfLines={2}>{intro}
                    </Description>
                </View>

                <StatsContainer>
                    <Stat>
                        <StatAmount>{user.post}</StatAmount>
                        <StatTitle>Posts</StatTitle>
                    </Stat>
                    <Stat>
                        <StatAmount>{user.follow}</StatAmount>
                        <StatTitle>Followers</StatTitle>
                    </Stat>
                    <Stat>
                        <StatAmount>{user.following}</StatAmount>
                        <StatTitle>Following</StatTitle>
                    </Stat>
                </StatsContainer>

                <EditProfile>
                    <EditProfileText onPress={() => navigation.navigate('EditPersonalProfile', { name: user.name })}>Edit Profile</EditProfileText>
                </EditProfile>
                {Posts.map((item) => {
                    if (item.id === user.id) {
                        // setCountPost(countPost + 1)
                        return <View key={item.id} style={styles.viewDeletePost}>
                            <PostCard
                                onOpenBottomSheet={onOpenBottomSheet}
                                modalizeRef={modalizeRef}
                                item={item}
                                id={user.id} />
                        </View>
                    }
                })}
            </Container>

            <AnimatedBottomSheet
                modalizeRef={modalizeRef}
                id={user.id} />
        </SafeAreaView>
    )
}

const MainProfileStackScreen = ({ navigation }) => {
    return (
        <View style={{
            flex: 1, flexDirection: 'column', backgroundColor: 'red'
        }}>
            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather
                            name="menu"
                            size={30}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <FontAwesome
                            name="plus-square-o"
                            size={30}
                        />
                    </TouchableOpacity>
                }
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}
            />
            <ProfileStackScreen navigation={navigation} />
        </View >
    )
}

export default function ProfileScreen() {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerProfileScreen {...props} />}>
            <Drawer.Screen
                name="MainProfileStackScreen" component={MainProfileStackScreen} />
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