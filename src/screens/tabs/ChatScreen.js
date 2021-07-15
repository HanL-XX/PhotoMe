import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GiftedChat } from 'react-native-gifted-chat'
import {
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserName,
    UserInfoText,
    PostTime,
} from '../../styles/ChatStyles'


export default function ChatScreen({ navigation, route }) {
    const { name } = route.params //name in ProfileUserScreen
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                }}
                centerComponent={
                    <UserInfo>
                        <UserImgWrapper>
                            <UserImg source={route.params.userImg} />
                        </UserImgWrapper>
                        <UserInfoText>
                            {name ? <UserName>{name}</UserName> : <UserName>{route.params.userName}</UserName>}
                            <PostTime>?</PostTime>
                        </UserInfoText>
                    </UserInfo>
                }
                leftComponent={
                    <View style={styles.fontIcon}>
                        <TouchableOpacity>
                            <FontAwesome
                                name="angle-left"
                                size={26}
                                backgroundColor="#fff"
                                color="#000"
                                onPress={() => navigation.goBack()} />
                        </TouchableOpacity>

                    </View>
                }
                rightComponent={
                    <View style={styles.fontIcon}>
                        <TouchableOpacity>
                            <FontAwesome
                                style={styles.icon}
                                name="phone"
                                size={24}
                                color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome
                                style={styles.icon}
                                name="video-camera"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('InfoChat')}>
                            <FontAwesome
                                style={styles.icon}
                                name="info-circle"
                                size={24}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                } >
            </Header>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    fontIcon: {
        paddingTop: 7,
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 11,
    },
})