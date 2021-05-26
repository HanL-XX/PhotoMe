import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, RefreshControl } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from 'react-native-elements'

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

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
import AnimatedBottomSheet from '../../components/AnimatedBottomSheet'

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
        saves: '5',

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
        saves: '5',

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
        saves: '5',

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
        saves: '5',

    },
]

//change Profile in here!
const ProfileStackScreen = ({ navigation }) => {
    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);
    const onOpenBottomSheet = () => {
        modalizeRef.current?.open();
    }

    const [name, setName] = useState('Phạm Vũ Lê Minh')
    const [userName, setUserName] = useState('phamvuleminh')

    //Refresh Screen
    const [refreshing, setRefreshing] = React.useState(false);
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
                        <UserImg source={require("../../assets/images/user1.jpg")} />
                    </UserImgContainer>
                    <UserName
                        value={name}
                        defaultValue={name}
                        editable={false}
                        selectTextOnFocus={false} />
                    <Description numberOfLines={2}>IT - Software Engineering
                    </Description>
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
                            <PostCard
                                onOpenBottomSheet={onOpenBottomSheet}
                                modalizeRef={modalizeRef}
                                item={item} />
                        </View>
                    }
                })}
            </Container>

            <AnimatedBottomSheet
                modalizeRef={modalizeRef}
                userName={userName} >

            </AnimatedBottomSheet>
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