import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { Header } from 'react-native-elements'

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<Text style={styles.textContent}>PhotoMe</Text>}
                rightComponent={<View style={styles.fontIcon}>
                    <TouchableOpacity>
                        <FontAwesome
                            style={styles.icon}
                            name="plus"
                            size={25}
                            color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome
                            style={styles.icon}
                            name="facebook-messenger"
                            size={25}
                            color="#000"
                            onPress={() => { navigation.navigate("Message") }} />
                    </TouchableOpacity>

                </View>}
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}
            />
            <Text style={{ fontSize: 22 }}>Welcome to Home Screen</Text>
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
    },
    textContent: {
        flex: 1,
        width: 130,
        fontSize: 25,
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "center",
    },
    fontIcon: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 10,
    }
})