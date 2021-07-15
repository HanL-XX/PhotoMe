import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { windowWidth, windowHeight } from '../utils/Dimensions'

export default function ButtonForm({ buttonTitle, btnType, color, backgroundColor, ...rest }) {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor }]} {...rest}>
            <View style={styles.iconWrapper}>
                <FontAwesome
                    style={styles.icon}
                    name={btnType}
                    size={24}
                    color={color} />
            </View>
            <View style={styles.btnTxtWrapper}>
                <Text style={[styles.buttonText, { color }]}>
                    {buttonTitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 3,
    },
    iconWrapper: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontWeight: 'bold',
    },
    btnTxtWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})