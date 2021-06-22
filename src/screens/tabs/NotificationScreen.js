import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet,FlatList,RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios'
import { MAIN_URL } from '../../config'
import {
    UserInfo, UserImg,Container,
    UserInfoWrapper, UserInfoText,UserNotifi
} from '../../styles/NotificationStyle'

export default function NotificationScreen() {
    const isFocused = useIsFocused()
    const [notifi, setNotifi] = useState([])
    const fetchNotifi=async()=>{
        const id = await AsyncStorage.getItem('userId_Key');
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/newfeed`,
            params: {
                id_User: id
            }
        })
        .then(async response => {
            for(let i of response.data.newfeed)
            {
                if(i.id_impact)
                {
                    axios({
                        method: 'GET',
                        url: `${MAIN_URL}/api/profile`,
                        params: {
                            id_User: i.id_impact
                        }
                    })
                    .then((profile)=>{
                        let noti={
                            id: i._id,
                            avatar:profile.data.profile.avatar,
                            name:profile.data.profile.name
                        }
                        if(profile)
                        {
                            setNotifi(notifi=>[...notifi,noti])
                        }
                    })
                    .catch(err => console.log(err))
                }
            }
        })
        .catch(err => console.log(err))
    }
    useEffect(async () => {
        setNotifi([])
        fetchNotifi()
    }, [isFocused])
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
            setNotifi([])
            setRefreshing(false);
            fetchNotifi()
        })
    }, [refreshing])
    return (
        <View>
                <FlatList
                    style={{ width: '100%'}}
                    showsVerticalScrollIndicator={false}
                    data={notifi}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <UserNotifi>
                            <UserImg source={{uri:item.avatar}} />
                            <UserInfoWrapper>
                                <UserInfoText>
                                    <Text style={{
                                        fontSize: 17,
                                        color: '#444',
                                        fontWeight: '700'
                                    }}> {item.name} </Text>
                                    đã tương tác bài viết của bạn</UserInfoText>
                            </UserInfoWrapper>
                        </UserNotifi>
                    }
                />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})