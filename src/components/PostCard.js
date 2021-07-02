import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'
import { UpdateLikePost, getThisPost, getLiked } from '../api'

import TimeAgo from './Time'
import {
    Card,
    UserImg,
    UserInfo,
    UserName,
    Follow,
    FollowText,
    UserInfoText,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divide,
    IconJob
} from '../styles/FeedStyle'
import { iconJob } from '../config/globalIcon'

export default function PostCard({ item, onOpenBottomSheet, modalizeRef, onPress, avatar, name, iconjob }) {
    const [id, setId] = useState(null)
    //Set up react heart
    const [liked, setLiked] = useState(false) //false: none-color <--> true: red color
    const [react, setReact] = useState({
        liked: null,
        likeCount: item.like
    })
    const [followed, setFollowed] = useState('Following')

    //return liked in Object
    useEffect(async () => {
        const id_User = await AsyncStorage.getItem('userId_Key')
        setId(id_User)
        await getLiked(id_User, item._id).then(data => setLiked(data.liked.liked))
    }, [item._id])

    //handle event to react
    _onPressReact = async () => {
        const id_User = await AsyncStorage.getItem('userId_Key')
        UpdateLikePost(id_User, item._id).
            then(() => {
                setLiked(!liked)
                if (liked === false) {

                    console.log("Exist ID React Post")
                    setReact({ likeCount: react.likeCount + 1 })
                    return;
                }
                else {
                    setReact({ likeCount: react.likeCount - 1 })
                    return;
                }

            })
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
                                {(item.id_User !== id) ?
                                    (
                                        <Follow>
                                            <Text> • </Text>
                                            <TouchableOpacity>
                                                <FollowText>{followed}</FollowText>
                                            </TouchableOpacity>
                                        </Follow>
                                    ) :
                                    (<></>)}

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TimeAgo time={item.registration_data} />
                                <IconJob source={iconJob.icons[iconjob]} />
                                {/* add icon Major */}
                            </View>
                        </UserInfoText>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            onOpenBottomSheet(item._id)
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
                    <InteractionText>{react.likeCount} Like</InteractionText>
                </Interaction>
                <Interaction>
                    <TouchableOpacity>
                        <FontAwesome
                            name="comment-o"
                            size={24} />
                    </TouchableOpacity>
                    <InteractionText>{item.comment} Comment</InteractionText>
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