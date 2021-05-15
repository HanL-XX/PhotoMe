import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function EditPersonalProfile({ navigation, route }) {
    return (
        <View style={styles.container}>
            <Text>
                {route.params.name}
            </Text>
        </View>
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
