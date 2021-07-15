import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, RefreshControl, ImageBackground, ActivityIndicator } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
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
    ViewCreate,
    TextReview,
    TextCreate
} from '../../styles/ProfileStyle'
import PostCard from '../../components/PostCard'
import DrawerProfileScreen from '../tabs/DrawerProfileScreen'
import AnimatedBottomSheet from '../../components/AnimatedBottomSheet'
import AsyncStorage from '@react-native-community/async-storage'
import { fetchDataProfile, getAllMindPost } from '../../api'
import { onOpenBottomSheet, deleteThisPost } from '../../api/activePost'

const Drawer = createDrawerNavigator(); // create Drawer Navigator

//change Profile in here!
const ProfileStackScreen = ({ navigation }) => {
    const isFocused = useIsFocused(); //refresh when goBack here!!!
    const [ref, setRef] = useState(null)
    const [dataSourceCord, setDataSourceCord] = useState(0)
    const [user, setUser] = useState({
        id: null,
        name: null,
        avatar: null,
        intro: null,
        sex: null,
        follow: 0,
        following: 0,
        post: 0,
        job: null,
        iconjob: null,
        birthday: null,
    })
    const [display, setDisplay] = useState({ //collapse reload
        display: 'none',
        animating: true,
    })

    //Array Posts
    const [Posts, setPosts] = useState([])

    const fetchProfile = async () => {
        const id = await AsyncStorage.getItem('userId_Key')
        await fetchDataProfile(id).then(data => {
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
        }).catch(err => {
            return err;
        })
    }

    const fetchNewFeed = async () => {
        const id = await AsyncStorage.getItem('userId_Key')
        await getAllMindPost(id).then(data => {
            setPosts(data)
        })
    }

    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);
    //delete Post
    const handleDelete = async () => {
        deleteThisPost(modalizeRef)
    }

    const scrollPost = () => {
        ref.scrollTo({
            x: 0,
            y: dataSourceCord,
            animated: true,
        })
    }

    const onLayout = (e) => {
        const layout = e.nativeEvent.layout
        setDataSourceCord(layout.y)
    }

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
            await fetchProfile()
            await fetchNewFeed()
            setRefreshing(false);
        })
    }, [refreshing])

    useEffect(async () => {
        await fetchProfile()
        wait(2000).then(async () => {
            await fetchNewFeed()
            setDisplay({
                display: 'flex',
                animating: false
            })
        })
    }, [isFocused])

    return (
        <SafeAreaView>
            <Container
                ref={(ref) => setRef(ref)}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} //must be code there!
                showVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, paddingTop: 15 }}>
                    <UserImgContainer>
                        <UserImg source={{ uri: user.avatar }} />
                    </UserImgContainer>
                    <UserName
                        value={user.name}
                        defaultValue={user.name}
                        editable={false}
                        selectTextOnFocus={false} />
                    {
                        (user.intro !== null) ? (
                            <Description numberOfLines={2}>{user.intro}
                            </Description>
                        ) : (<></>)
                    }

                </View>

                <StatsContainer>
                    <Stat
                        activeOpacity={0.6}
                        onPress={scrollPost}>
                        <StatAmount>{user.post}</StatAmount>
                        <StatTitle>Posts</StatTitle>
                    </Stat>
                    <Stat
                        onPress={() => navigation.navigate('Follower', { countFollower: user.follow })}
                        activeOpacity={0.6}>
                        <StatAmount>{user.follow}</StatAmount>
                        <StatTitle>Followers</StatTitle>
                    </Stat>
                    <Stat
                        onPress={() => navigation.navigate('Following', { countFollowing: user.following })}
                        activeOpacity={0.6}>
                        <StatAmount>{user.following}</StatAmount>
                        <StatTitle>Following</StatTitle>
                    </Stat>
                </StatsContainer>

                <EditProfile>
                    <EditProfileText onPress={() => navigation.navigate('EditPersonalProfile', {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        intro: user.intro,
                        job: user.job,
                        birthday: user.birthday,
                        sex: user.sex,
                    })}>
                        Edit Profile
                    </EditProfileText>
                </EditProfile>
                <View style={{ position: 'relative', width: '100%', alignItems: 'center' }}>
                    <ActivityIndicator
                        color="#999"
                        animating={display.animating}
                        style={{ position: 'absolute', top: '40%' }}
                        size="small" />
                </View>
                <View
                    onLayout={onLayout}
                    style={{ width: '100%', display: display.display, backgroundColor: '#fff' }}>
                    {
                        (Posts.length == 0) ? (
                            <View style={{ width: '100%', alignItems: 'center', textAlign: 'center' }}>
                                <ImageBackground
                                    style={{ width: '105%', height: 280, alignItems: 'center' }}
                                    source={require("../../assets/images/post.png")}
                                />
                                <ViewCreate>
                                    <TextReview>Haven't posted yet</TextReview>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => navigation.navigate("PostMind")}
                                    >
                                    </TouchableOpacity>
                                </ViewCreate>
                            </View>
                        ) : (<>{
                            Posts.map((item) => {
                                if (item.id_User === user.id) {
                                    return (
                                        <View
                                            key={item._id}
                                            style={styles.viewDeletePost}>
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
                        }</>)
                    }
                </View>

            </Container>

            <AnimatedBottomSheet
                modalizeRef={modalizeRef}
                handleDelete={handleDelete}
                id={user.id} />
        </SafeAreaView >
    )
}

const MainProfileStackScreen = ({ navigation }) => {
    return (
        <View style={{
            flex: 1, flexDirection: 'column'
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
                // rightComponent={
                //     <TouchableOpacity onPress={() => navigation.openDrawer()}>
                //         <FontAwesome
                //             name="plus-square-o"
                //             size={30}
                //         />
                //     </TouchableOpacity>
                // }
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
                name="MainProfileStackScreen"
                component={MainProfileStackScreen} />
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