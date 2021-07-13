import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { Header } from 'react-native-elements'

import Ionicons from 'react-native-vector-icons/Ionicons'
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
import { fetchDataProfile, getAllMindPost } from '../../api'
import { onOpenBottomSheet } from '../../api/deletePost'
import { fetchFollow, activeFollow, activeUnfollow } from '../../api/followProfile'

//change Profile in here!
const ProfileUserStackScreen = ({ navigation, route }) => {
    const id_User = route.params.id_User
    const [checkedFollow, setCheckedFollow] = useState(false)
    const isFocused = useIsFocused(); //refresh when goBack here!!!
    const [user, setUser] = useState({
        id: null,
        name: null,
        avatar: null,
        intro: null,
        sex: null,
        follow: null,
        following: null,
        post: null,
        job: null,
        iconjob: null,
        birthday: null,
    })
    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);

    //wait time
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        })
    }
    //Refresh Screen
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);

        wait(2000).then(async () => {
            await getDataProfile()
            await fetchNewFeed()
            setRefreshing(false);
        })
    }, [refreshing])

    const [Posts, setPosts] = useState([])
    const fetchNewFeed = async () => {
        await getAllMindPost(id_User).then(data => {
            setPosts(data)
        })
    }

    const handleFollow = async (checked) => {
        switch (checked) {
            case true:
                setCheckedFollow(true)
                activeFollow(id_User)
                break;

            case false:
                setCheckedFollow(false)
                activeUnfollow(id_User)
                break;
            default: break;

        }
    }

    const getDataProfile = async () => {
        await fetchDataProfile(id_User).then((data) => {
            setUser({
                id: data.id_User,
                name: data.name,
                avatar: data.avatar,
                intro: data.intro,
                sex: data.sex,
                follow: data.follow,
                following: data.following,
                post: data.post,
                job: data.job,
                iconjob: data.iconjob,
                birthday: data.birthday,
            })
        })
    }

    const getFollow = async () => {
        await fetchFollow().then(data => {
            data.map(item => {
                console.log(item)
                if (item === id_User) {
                    setCheckedFollow(true)
                }
                else
                    setCheckedFollow(false)
            })
        }).catch(err => { return })

    }

    useEffect(async () => {
        await getFollow()
        await getDataProfile()
        await fetchNewFeed()
        console.log("ID user: " + id_User)
    }, [isFocused])

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
                    <Description numberOfLines={2}>{user.intro}
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
                <View style={{ flexDirection: 'row' }}>
                    <ProfileUser onPress={() => navigation.navigate('Chat', { name: user.name })}>
                        <ProfileUserText>Message</ProfileUserText>
                    </ProfileUser>
                    {
                        (checkedFollow === false) ? (
                            <ProfileUser
                                activeOpacity={0.6}
                                style={{ backgroundColor: "#3a96ff" }}
                                onPress={() => handleFollow(true)}>
                                <ProfileUserText style={{ color: '#fff' }}>Follow</ProfileUserText>
                            </ProfileUser>
                        ) : (<ProfileUser
                            activeOpacity={0.6}
                            style={{ borderColor: "#16af37" }}
                            onPress={() => handleFollow(false)}>
                            <ProfileUserText style={{ color: '#16af37' }}>Following</ProfileUserText>
                        </ProfileUser>)
                    }

                </View>

                {
                    // Posts.map((item) => {
                    //     if (item.userName === userName) {
                    //         // setCountPost(countPost + 1)
                    //         return <View key={item.id} style={styles.viewDeletePost}>
                    //             <PostCard
                    //                 onOpenBottomSheet={onOpenBottomSheet}
                    //                 modalizeRef={modalizeRef}
                    //                 item={item} />
                    //         </View>
                    //     }
                    // })
                    Posts.map((item) => {
                        if (item.id_User === user.id) {
                            return (
                                <View key={item._id} style={styles.viewDeletePost}>
                                    <PostCard
                                        navigation={navigation}
                                        onOpenBottomSheet={onOpenBottomSheet}
                                        modalizeRef={modalizeRef}
                                        item={item}
                                        iconjob={user.iconjob}
                                        avatar={user.avatar}
                                        name={user.name} />
                                </View>
                            )
                        }
                    })
                }
            </Container>

            <AnimatedBottomSheet modalizeRef={modalizeRef}>

            </AnimatedBottomSheet>
        </SafeAreaView >
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