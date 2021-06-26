import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Header } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons"
import { createNewPost } from '../../api'
import PostInput from '../../components/PostInput'

export default function PostMind({ navigation }) {
    const [newPost, setNewPost] = useState({
        status: null,
        image: 'https://console.firebase.google.com/u/0/project/photome-test1/storage/photome-test1.appspot.com/files/~2Fimages~2Fwallpaper',
    })

    const submitPost = async (data) => {
        createNewPost(data)
            .then(post => {
                Alert.alert(
                    //Title
                    post.msg,
                    //Body
                    "Create post successfully!",
                    [
                        {
                            text: 'Yes',
                            onPress: async () => {
                                const seconds = Math.floor(Math.random() * 1600) + 950
                                setTimeout(() => {
                                    navigation.goBack()
                                }, seconds);

                            }
                        },
                    ]
                )
            }
            )
    }

    return (
        <View style={styles.container}>
            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="arrow-back"
                            size={30}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => submitPost(newPost)}>
                        <Text style={styles.buttonText}>Upload</Text>
                    </TouchableOpacity>
                }
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}
            />
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    // underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={(value) => { setNewPost({ ...newPost, status: value }) }}
                />
            </View>
            <PostInput
                check="1"
                iconType='image'
                namePost='Upload Image' />
            <PostInput
                iconType='grid-outline'
                namePost='Select Category' />
            <PostInput
                iconType='list'
                namePost='Create wishlist' />
            <PostInput
                iconType='lock-closed-outline'
                namePost='Strict'
                checkDescript="1"
                textDescript='Only allow to initiate a swap if user has item on wishlist' />
        </View>
    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textAreaContainer: {
        padding: 5,
        width: '100%',
    },
    textArea: {
        height: 150,
        fontSize: 18,
        justifyContent: "flex-start",
        color: '#000',
    },
    button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 12,
        textAlign: 'center',
        backgroundColor: '#2289ff',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: '500'
    }
})
