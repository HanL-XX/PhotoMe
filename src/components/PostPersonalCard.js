import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PostCard from './PostCard'

export default function PostPersonalCard({ ...item }) {
    return (
        <View style={styles.container}>
            <FontAwesome
                name="trash-o"
                size={27} />
            <PostCard item={item} />

        </View>
    )
}


const styles = StyleSheet.create({
    redColor: {
        color: '#fc2c2c',
    },
    emptyColor: {

    },
    container: {
        width: '100%',
        backgroundColor: 'gray',
    }
})