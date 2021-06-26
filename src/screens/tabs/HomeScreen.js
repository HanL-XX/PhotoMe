import React, { useContext, useEffect, useState } from 'react'
import { useIsFocused } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Header } from 'react-native-elements'
import PostCard from '../../components/PostCard'
import {
    Container,
    HeaderBar,
    StatusBar,
    UserImgStatus,
    InputForm,

} from '../../styles/FeedStyle'
import AnimatedBottomSheet from '../../components/AnimatedBottomSheet'
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../../context/AuthContext'
import { fetchDataProfile, getAllPosts } from '../../api'

//change HomeScreen in here!
const HomeStackScreen = ({ navigation }) => {
    // const [id, setId] = useState(null)
    const [Posts, setPosts] = useState([])

    const isFocused = useIsFocused(); //refresh when goBack here!!!
    const [avatar, setAvatar] = useState(null) //set avatar from ProfileScreen
    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);
    const onOpenBottomSheet = () => {
        modalizeRef.current?.open();
    }

    //Refresh Screen
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    })

    //get all Posts from db
    const getPosts = async () => {
        await getAllPosts().then(async (data) => {
            for (let i of data) {
                await fetchDataProfile(i.document[0].id_User)
                    .then(profile => {
                        i.__proto__ = "avatar"
                        i.avatar = profile.avatar
                        i.__proto__ = "name"
                        i.name = profile.name
                        i.__proto__ = "iconjob"
                        i.iconjob = profile.iconjob

                    })
            }
            setPosts(data)
        })
    }

    const handlePostCardUser = async (dataUser) => {
        const id = await AsyncStorage.getItem('userId_Key')
        // console.log(dataUser)
        if (id !== dataUser.id_User) {
            navigation.navigate('ProfileUserScreen', { dataUser: dataUser }) // their Profile 
        }
        else {
            navigation.navigate('Profile') // my Profile
        }
    }

    useEffect(async () => {
        const ids = await AsyncStorage.getItem('userId_Key')
        // setId(ids)
        // console.log(id)
        await fetchDataProfile(ids).then((data) => {
            setAvatar(data.avatar)
        })
        await getPosts()
    }, [isFocused])

    return (
        <Container>
            <HeaderBar>
                <StatusBar>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate("Profile")}>
                        <UserImgStatus
                            source={{ uri: avatar }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ width: "80%" }}
                        onPress={() => { navigation.navigate('PostMind') }}>
                        <InputForm>
                            What's on your mind?
                        </InputForm>
                    </TouchableOpacity>

                </StatusBar>
            </HeaderBar >
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {
                    Posts.map((item) => {
                        return (
                            <View key={item._id} style={styles.viewDeletePost}>
                                <PostCard
                                    onOpenBottomSheet={onOpenBottomSheet}
                                    modalizeRef={modalizeRef}
                                    item={item.document[0]}
                                    avatar={item.avatar}
                                    name={item.name}
                                    // iconjob={user.iconjob}
                                    onPress={() => handlePostCardUser(item.document[0])} />
                            </View>
                        )
                    })
                }
            </ScrollView>

            {/* <FlatList
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={Posts}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                keyExtractor={item => item._id}
                renderItem={({ item }) =>
                    <PostCard
                        onOpenBottomSheet={onOpenBottomSheet}
                        modalizeRef={modalizeRef}
                        item={item.document}
                        // aavatar={item.document.image}
                        // name={item.document.name}
                        // iconjob={item.document.iconjob}
                        onPress={() => { handlePostCardUser(item.document) }}
                    />}
            /> */}

            {/* //show bottom sheet */}
            <AnimatedBottomSheet
                modalizeRef={modalizeRef} >

            </AnimatedBottomSheet>
        </Container >
    )
}

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<Text style={styles.textContent}>PhotoMe</Text>}
                rightComponent={
                    <View style={styles.fontIcon}>
                        <TouchableOpacity>
                            <FontAwesome5
                                style={styles.icon}
                                name="plus"
                                size={25}
                                color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome5
                                style={styles.icon}
                                name="facebook-messenger"
                                size={25}
                                color="#000"
                                onPress={() => { navigation.navigate("Message") }} />
                        </TouchableOpacity>
                    </View>
                }
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}
            />
            <HomeStackScreen navigation={navigation} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContent: {
        flex: 1,
        width: 130,
        fontSize: 25,
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "center",
    },
    fontIcon: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 10,
    }
})