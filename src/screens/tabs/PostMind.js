import React from 'react'
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons"

import PostInput from '../../components/PostInput'

const PostMindStack = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    // underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
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

export default function PostMind({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
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
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Upload</Text>
                    </TouchableOpacity>
                }
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}
            />
            <PostMindStack />

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
