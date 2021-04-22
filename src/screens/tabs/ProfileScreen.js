import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22 }}>Welcome to Profile Screen</Text>
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