import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {
    Card, UserImg,
    Image, UserInfo,
    Wrapper,
    Following,
    UserName, WorkName,
    FormButton, Button,
} from '../styles/FollowCardStyle'

export default function FollowingCard({ item, onPress, handleUnfollow, }) {

    return (
        <Card
            activeOpacity={0.8}
            onPress={onPress}>
            <Wrapper>
                <UserImg>
                    <Image source={{ uri: item.avatar }} />
                </UserImg>
                <UserInfo>
                    <UserName>{item.name}</UserName>
                    {
                        (item.iconjob === null) ? (
                            <WorkName>None</WorkName>

                        ) : (
                            <WorkName>{item.iconjob}</WorkName>
                        )
                    }
                </UserInfo>
            </Wrapper>
            <FormButton>
                <Button
                    onPress={() => handleUnfollow(item.id_User, item.avatar, item.name)}
                    activeOpacity={0.7}>
                    <Following>Following</Following>
                </Button>
                <TouchableOpacity>
                    <Feather
                        name="more-vertical"
                        size={23}
                        style={{ textAlign: 'right' }} />
                </TouchableOpacity>
            </FormButton>
        </Card>
    )
}
