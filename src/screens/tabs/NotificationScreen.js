import React, { useState, useEffect } from 'react'
import { Text, FlatList, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useIsFocused } from "@react-navigation/native";
import { getAllMindPost, checkUserReactPost } from '../../api'
import {
    SafeAreaView, Container, UserImg,
    UserInfoWrapper, UserInfoText, UserNotification
} from '../../styles/NotificationStyle'

export default function NotificationScreen({ navigation }) {
    const isFocused = useIsFocused()
    const [notification, setNotification] = useState([])
    const [idUser, setIdUser] = useState(null)

    const fetchNotification = async () => {
        const id = await AsyncStorage.getItem('userId_Key');
        setIdUser(id)

        getAllMindPost(id)
            .then(data => {
                for (let i of data) {
                    if (i.id_impact) {
                        checkUserReactPost(i.id_impact).then((data) => {
                            let noti = {
                                id_User: data.id_User,
                                id: i._id,
                                avatar: data.avatar,
                                name: data.name
                            }
                            if (data) {
                                setNotification(notification => [...notification, noti])
                            }
                        })
                            .catch(err => console.log(err))
                    }
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(async () => {
        setNotification([])
        await fetchNotification()
    }, [isFocused])

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
            await fetchNotification()
            setNotification([])
            setRefreshing(false);
        })
    }, [refreshing])

    const openThisPost = (idPost) => {
        navigation.navigate('Post', { idPost: idPost })
    }

    return (
        <SafeAreaView>
            <Container>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                    data={notification}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                    (
                        (idUser === item.id_User) ? (
                            <></>
                        ) : (
                            <UserNotification
                                activeOpacity={0.8}
                                onPress={() => { openThisPost(item.id) }}>
                                <UserImg source={{ uri: item.avatar }} />
                                <UserInfoWrapper>
                                    <UserInfoText>
                                        <Text
                                            style={{
                                                fontSize: 17,
                                                color: '#444',
                                                fontWeight: '700'
                                            }}> {item.name} </Text>
                                        đã tương tác bài viết của bạn</UserInfoText>
                                </UserInfoWrapper>
                            </UserNotification>)

                    )}
                />
            </Container>
        </SafeAreaView >
    )
}