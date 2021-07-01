import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'
import { UpdateLikePost, fetchLiked, getThisPost } from '../api'

import TimeAgo from './Time'
import {
    Card,
    UserImg,
    UserInfo,
    UserName,
    UserInfoText,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divide,
    IconJob
} from '../styles/FeedStyle'
import { iconJob } from '../styles/globalIcon'

export default function PostCard({ navigation, item, onOpenBottomSheet, modalizeRef, onPress, avatar, name, iconjob }) {
    const isFocused = useIsFocused(); //refresh when goBack here!!!
    // const isFocused = useIsFocused()
    const [id, setId] = useState(null)
    //Set up react heart
    const [liked, setLiked] = useState(null) //false: none-color <--> true: red color
    const [react, setReact] = useState({
        liked: null,
        likeCount: 0
    })
    const [followed, setFollowed] = useState('Following')

    //return liked in Object
    useEffect(async () => {
        const id_User = await AsyncStorage.getItem('userId_Key')
        setId(id_User)
        await fetchLiked(id_User, item._id).then(liked => setLiked(liked))
        await getThisPost(item._id).then(data => {
            setReact({ ...react, likeCount: data.like })
        })
    }, [item.like, isFocused])

    //handle event to react
    _onPressReact = async () => {
        const id_User = await AsyncStorage.getItem('userId_Key')
        UpdateLikePost(id_User, item._id).
            then(async () => {
                setLiked(!liked)
                react.likeCount = item.like
                await getThisPost(item._id).then(data => {
                    setReact({ ...react, likeCount: data.like })
                })
            })
    }
    //open Comment post
    const openComment = () => {
        navigation.navigate("Comment", { id_Post: item._id, comments: item.comment })
    }

    return (
        <Card>
            <TouchableOpacity onPress={onPress} activeOpacity={1}>
                <UserInfo onPress={onPress}>
                    <View style={{ flexDirection: 'row' }} >
                        <UserImg source={{ uri: avatar }} />
                        <UserInfoText>
                            <View style={{ flexDirection: 'row' }}>
                                <UserName>{name}</UserName>
                                <IconJob source={iconJob.icons[iconjob]} />
                                {/* {(item.id_User !== id) ?
                                    (
                                        <Follow>
                                            <Text>•</Text>
                                            <TouchableOpacity>
                                                <FollowText> {followed} </FollowText>
                                            </TouchableOpacity>
                                        </Follow>
                                    ) :
                                    (<></>)} */}

                            </View>
                            <View>
                                <TimeAgo time={item.registration_data} />
                                {/* add icon Major */}
                            </View>
                        </UserInfoText>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            onOpenBottomSheet(modalizeRef, item._id)
                        }}>
                        <Feather
                            name="more-vertical"
                            size={23}
                            style={{ textAlign: 'right' }} />
                    </TouchableOpacity>
                </UserInfo>
            </TouchableOpacity >
            <PostText>{item.status}</PostText>
            {/* check display img */}
            {(item.image) ? <PostImg source={{ uri: item.image }} /> : <Divide />}

            <InteractionWrapper>
                <Interaction>
                    <TouchableOpacity onPress={_onPressReact}>
                        <FontAwesome
                            name={liked ? "heart" : "heart-o"}
                            style={liked ? styles.redColor : styles.emptyColor}
                            size={24} />
                    </TouchableOpacity>
                    <InteractionText>{react.likeCount} Likes</InteractionText>
                </Interaction>
                <Interaction>
                    <TouchableOpacity onPress={openComment}>
                        <FontAwesome
                            name="comment-o"
                            size={24} />
                    </TouchableOpacity>
                    <InteractionText>{item.comment} Comments</InteractionText>
                </Interaction>
                {/* {item.image != 'none' ?
                    (
                        <Interaction>
                            <TouchableOpacity>
                                <Feather
                                    name="download"
                                    size={24} />
                            </TouchableOpacity>
                            <InteractionText>{item.saves} Saves</InteractionText>
                        </Interaction>
                    ) : <></>
                } */}
            </InteractionWrapper>
        </Card >
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    redColor: {
        color: '#e63333',
    },
    emptyColor: {
        color: '#000',
    }
})