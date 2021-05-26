import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
    Divide
} from '../styles/FeedStyle'

export default function PostCard({ item, onOpenBottomSheet, modalizeRef }) {
    //Set up react heart
    const [liked, setLiked] = useState('') //false: none-color <--> true: red color
    const [likesText, setLikesText] = useState('Like')
    const [commentsText, setCommentsText] = useState('Comment')
    const [savesText, setSavesText] = useState('Save')
    const [followed, setFollowed] = useState('Following')

    //return liked in Object
    useEffect(() => {
        setLiked(item.liked);
    }, [])

    useEffect(() => {
        if (item.likes > 1)
            return setLikesText('Likes')
        else
            return setLikesText('Like')
    })

    //handle event to react
    _onPressReact = () => {
        if (!liked) {
            item.likes++;
            setLiked(!liked)
        }
        else {
            (item.likes == 0) ? item.likes = 0 : item.likes--;
            setLiked(!liked)
        }
    }

    return (
        <Card>
            <UserInfo>
                <View style={{ flexDirection: 'row' }}>
                    <UserImg source={item.userImg} />
                    <UserInfoText>
                        <View style={{ flexDirection: 'row' }}>
                            <UserName>{item.userName}</UserName>
                            {(followed === 'Following' && item.userName !== 'phamvuleminh' ? (
                                <Follow>
                                    <Text> • </Text>
                                    <TouchableOpacity>
                                        <FollowText>{followed}</FollowText>
                                    </TouchableOpacity>
                                </Follow>) : <></>)}

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TimeAgo time={item.postTime} />
                            {/* add icon Major */}
                        </View>
                    </UserInfoText>
                </View>
                <TouchableOpacity onPress={onOpenBottomSheet}>
                    <Feather
                        name="more-vertical"
                        size={23}
                        style={{ textAlign: 'right' }} />
                </TouchableOpacity>
            </UserInfo>
            <PostText>{item.postText}</PostText>
            {/* check display img */}
            {item.postImg != 'none' ? <PostImg source={item.postImg} /> : <Divide />}

            <InteractionWrapper>
                <Interaction>
                    <TouchableOpacity onPress={this._onPressReact}>
                        <FontAwesome
                            name={liked ? "heart" : "heart-o"}
                            style={liked ? styles.redColor : styles.emptyColor}
                            size={24} />
                    </TouchableOpacity>
                    <InteractionText>{item.likes} {likesText}</InteractionText>
                </Interaction>
                <Interaction>
                    <TouchableOpacity>
                        <FontAwesome
                            name="comment-o"
                            size={24} />
                    </TouchableOpacity>
                    <InteractionText>{item.comments} Comments</InteractionText>
                </Interaction>
                {item.postImg != 'none' ?
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
                }
            </InteractionWrapper>
            {/* //show bottom sheet */}

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