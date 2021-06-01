import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from 'react-native-elements'

import Ionicons from 'react-native-vector-icons/Ionicons'
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
    ProfileUser,
    ProfileUserText
} from '../../styles/ProfileStyle'
import PostCard from '../../components/PostCard'
import AnimatedBottomSheet from '../../components/AnimatedBottomSheet'

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
        userName: 'Hà Nhật Linh',
        userImg: require('../../assets/images/user2.png'),
        postTime: time,
        postText: `Perfect Image for Bird!`,
        postImg: require('../../assets/images/postImg/post2.jpg'),
        liked: false,
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
        liked: false,
        likes: '1K',
        comments: '52',
        saves: '5',

    },
]

//change Profile in here!
const ProfileUserStackScreen = ({ navigation, route }) => {
    const { userImg, userName } = route.params.dataUser
    // const [countPost, setCountPost] = useState(0)
    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);
    const onOpenBottomSheet = () => {
        modalizeRef.current?.open();
    }

    //Refresh Screen
    const [refreshing, setRefreshing] = useState(false);
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
                        <UserImg source={userImg} />
                    </UserImgContainer>
                    <UserName
                        value={userName}
                        defaultValue={userName}
                        editable={false}
                        selectTextOnFocus={false} />
                    <Description numberOfLines={2}>{userName}
                    </Description>
                </View>

                <StatsContainer>
                    <Stat>
                        <StatAmount>2</StatAmount>
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
                <View style={{ flexDirection: 'row' }}>
                    <ProfileUser onPress={() => navigation.navigate('Chat', { name: userName })}>
                        <ProfileUserText>Message</ProfileUserText>
                    </ProfileUser>
                    <ProfileUser style={{ backgroundColor: "#3a96ff" }}>
                        <ProfileUserText style={{ color: '#fff' }}>Follow</ProfileUserText>
                    </ProfileUser>
                </View>

                {Posts.map((item) => {
                    if (item.userName === userName) {
                        // setCountPost(countPost + 1)
                        return <View key={item.id} style={styles.viewDeletePost}>
                            <PostCard
                                onOpenBottomSheet={onOpenBottomSheet}
                                modalizeRef={modalizeRef}
                                item={item} />
                        </View>
                    }
                })}
            </Container>

            <AnimatedBottomSheet modalizeRef={modalizeRef} name={userName}>

            </AnimatedBottomSheet>
        </SafeAreaView>
    )
}

export default function ProfileUserScreen({ navigation, route }) {
    return (
        <View style={{
            flex: 1, flexDirection: 'column', backgroundColor: 'red'
        }}>
            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="arrow-back"
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
            <ProfileUserStackScreen navigation={navigation} route={route} />
        </View >
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