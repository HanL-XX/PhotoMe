import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {
    Card, UserImg,
    Image, UserInfo,
    Wrapper, UserName,
    WorkName, FormButton,
    ButtonDelete, Delete,
} from '../styles/FollowCardStyle'

export default function FollowingCard({ item, onPress, handleDelete, }) {
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
                <ButtonDelete
                    onPress={() => handleDelete(item.id_User, item.avatar, item.name)}
                    activeOpacity={0.7}>
                    <Delete>Delete</Delete>
                </ButtonDelete>
            </FormButton>
        </Card >
    )
}
