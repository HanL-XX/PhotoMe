import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
    Divide
} from '../styles/FeedStyle'
export default function PostCard({ item }) {
    const [liked, setLiked] = useState('') //false: none-color <--> true: red color
    // useEffect(() => {
    //     setLiked(item.liked);
    //     return () => { setLiked(!liked) }
    // }, [liked])

    _onPressReact = () => {
        if (!liked) {
            item.likes++;
            setLiked(!liked)
            return;
        }

        else {
            (item.likes == 0) ? item.likes = 0 : item.likes--;
            setLiked(!liked)
        }
    }

    return (
        <Card>
            <UserInfo>
                <UserImg source={item.userImg} />
                <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <TimeAgo time={item.postTime} />
                </UserInfoText>
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
                    <InteractionText>{item.likes} Likes</InteractionText>
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
                            <InteractionText>{item.shares} Saves</InteractionText>
                        </Interaction>
                    ) : <></>
                }
                {item.userName === "phamvuleminh" ?
                    (
                        <Interaction
                            style={{
                                borderRadius: 15,
                                backgroundColor: '#f52b2b',
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => alert('Do you want to delete this post?')}>
                            <MaterialCommunityIcons style={{ color: '#fff' }}
                                name="delete"
                                size={22} />
                        </Interaction>
                    ) : <></>
                }
            </InteractionWrapper>
        </Card >

    )
}


const styles = StyleSheet.create({
    redColor: {
        color: '#e63333',
    },
    emptyColor: {
        color: '#000',
    }
})