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
    item = {
        avatar: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2F1625128696004.jpg?alt=media&token=c84e6000-205e-4729-9bd8-7361c55981f7',
        name: 'Lê Minh',
        iconjob: 'undefined',
    }

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
                        (item.iconjob === "undefined") ? (
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
