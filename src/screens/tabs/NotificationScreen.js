import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function NotificationScreen() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22 }}>Welcome to Notification Screen</Text>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})