import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function InfoChatScreen() {
    return (
        <View style={styles.container}>
            <Text>Info Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})