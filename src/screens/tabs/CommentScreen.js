import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { Header } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import CommentCard from '../../components/CommentCard'
import {
    Container, Wrapper,
    UserImg, UserInfo,
    CountComment, InputCommentView,
    InputComment
} from '../../styles/CommentStyle'

import { uploadComment, fetchMyAvatar, fetchComment, deleteComment } from '../../api'


export default function CommentScreen({ navigation, route }) {
    const isFocused = useIsFocused(); //refresh when goBack here!!!
    const [comment, setComment] = useState('')
    const { id_Post, comments } = route.params
    const [countComment, setCountComment] = useState(comments)
    const [listComment, setListComment] = useState([])
    const [avatar, setAvatar] = useState(null)

    const fetchAvatar = async () => {
        await fetchMyAvatar().then(avatar => setAvatar(avatar))
    }

    const fetchAllComment = async () => {
        await fetchComment(id_Post).then(data => {
            setListComment(data)
        })
    }
    useEffect(async () => {
        await fetchAvatar()
        await fetchAllComment()
        // console.log(listComment)
    }, [isFocused])

    const handleDelete = async (id_Newfeed, id_Comment) => {
        Alert.alert(
            //Title
            '',
            //Body
            "Do you want to delete?",
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        await deleteComment(id_Newfeed, id_Comment).then(async (data) => {
                            console.log(data.msg)
                            await fetchAllComment()
                            setCountComment(countComment - 1)
                        })
                    }
                },
                {
                    text: 'No',
                }
            ]
        )

    }

    const sendPostComment = async () => {
        await uploadComment(id_Post, comment).then(async (data) => {
            await fetchComment(data.id_Newfeed).then(data => {
                setListComment(data)
                setComment(null)
                setCountComment(countComment + 1)
            })
        })
    }

    return (
        <Container>
            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="arrow-back"
                            size={30}
                        />
                    </TouchableOpacity>
                }
                centerComponent={
                    <View>
                        <CountComment>{countComment} Comments</CountComment>
                    </View>
                }
                centerContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                containerStyle={{
                    paddingVertical: 0,
                    paddingHorizontal: 10,
                    backgroundColor: '#eee',
                }}
            />
            {
                listComment.map((item) => {
                    return (
                        <CommentCard
                            key={item._id}
                            item={item}
                            handleDelete={handleDelete} />
                    )
                })
            }
            <Wrapper>
                <UserInfo>
                    <UserImg source={{ uri: avatar }} />
                </UserInfo>
                <InputCommentView>
                    <InputComment
                        placeholder="Type something ..."
                        value={comment}
                        mode='outlined'
                        onChangeText={(value) => {
                            setComment(value)
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={sendPostComment}>
                        <FontAwesome
                            name="send"
                            size={24}
                            style={{ color: "#555" }}
                        />
                    </TouchableOpacity>
                </InputCommentView>
            </Wrapper>
        </Container>
    )
}
