import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import TimeAgo from './Time'
import { fetchDataProfile } from '../api'

export default function CommentCard({ item, handleDelete }) {
    const [id, setId] = useState(null)
    const [dataUser, setDataUser] = useState({
        name: null,
        avatar: null,
    })

    useEffect(async () => {
        id_User = await AsyncStorage.getItem('userId_Key')
        setId(id_User)
        fetchDataProfile(item.id_User).then(profile => {
            setDataUser({
                name: profile.name,
                avatar: profile.avatar,
            })
        })
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: dataUser.avatar }} />
            <View style={styles.wrapperInfo}>
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>
                        {dataUser.name}
                    </Text>
                    <TimeAgo time={item.registration_data} />
                </View>
                <View style={styles.commentView}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    {
                        (id === item.id_User) ? (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => handleDelete(item.id_Newfeed, item._id)}>
                                <MaterialCommunityIcons
                                    name="delete"
                                    size={25}
                                />
                            </TouchableOpacity>
                        ) : (<></>)
                    }
                    {/* <Text>{id_User} || {item.id_User}</Text> */}


                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    wrapperInfo: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
        alignItems: 'stretch',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userInfoText: {
        fontSize: 18,
        fontWeight: '600',

    },
    commentView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginTop: 8,
    },
    commentText: {
        width: '90%',
        fontSize: 17,
        fontWeight: '400',
        color: "#333",
    }
})