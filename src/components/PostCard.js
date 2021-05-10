import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
    Card,
    UserImg,
    UserInfo,
    UserName,
    PostTime,
    UserInfoText,
    PostText,
    PostImgEffect,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divide
} from '../styles/HomeStyle'
export default function PostCard({ item }) {
    const [liked, setLiked] = useState(false)
    _onPressReact = () => {
        if (!liked)
            item.likes++;
        else item.likes--;
        setLiked(!liked)
    }
    return (
        <Card>
            <UserInfo>
                <UserImg source={item.userImg} />
                <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.postTime}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.postText}</PostText>
            {/* check img or not img */}
            {item.postImg != 'none' ? <PostImg source={item.postImg} /> : <Divide />}

            <InteractionWrapper>
                <Interaction>
                    <TouchableOpacity onPress={this._onPressReact}>
                        <FontAwesome
                            name={liked ? "heart" : "heart-o"}
                            style={[(liked) ? styles.redColor : styles.emptyColor]}
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
            </InteractionWrapper>
        </Card>

    )
}


const styles = StyleSheet.create({
    redColor: {
        color: '#fc2c2c',
    },
    emptyColor: {

    }
})