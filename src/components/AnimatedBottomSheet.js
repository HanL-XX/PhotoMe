import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native'
// import { TapGestureHandler } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { useIsFocused } from "@react-navigation/native";
import { windowWidth } from '../utils/Dimensions.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { handleDeletePost } from '../api/activePost'
import { NavigatorIOS } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default function AnimatedBottomSheet({ modalizeRef, handleDelete, id }) {
    const isFocused = useIsFocused(); //refresh when goBack here!!!

    const [idUser, setIdUser] = useState(null)

    useEffect(async () => {
        const id_User = await AsyncStorage.getItem('userId_Key')
        setIdUser(id_User)
    }, [isFocused])

    return (
        <Modalize
            ref={modalizeRef}
            snapPoint={70} //200
            modalHeight={70} //200
            style={{ overflow: 'hidden' }} >
            <View style={styles.containerSheet}>
                {
                    (idUser === id) ? (
                        <TouchableOpacity style={styles.buttonSheet} onPress={handleDelete}>
                            <Text style={{ fontSize: 18, color: '#c94646' }}>Delete</Text>
                            <Ionicons
                                name='trash-bin'
                                size={23} />
                        </TouchableOpacity>
                    ) : (<></>)
                }
                {/* <TouchableOpacity style={styles.buttonSheet} onPress={() => {
                    modalizeRef.current?.close()
                }
                }>
                    <Text style={{ fontSize: 18 }}>Report...</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSheet}>
                    <Text style={{ fontSize: 18 }}>Turn on notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSheet}>
                    <Text style={{ fontSize: 18 }}>Save link</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.buttonSheet}>
                    <Text style={{ fontSize: 18 }}>Share</Text>
                </TouchableOpacity> */}
            </View>
        </Modalize >
    )
}


const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: windowWidth - 20,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerSheet: {
        position: 'relative',
        top: 0,
        left: 0,
        height: 70, //200
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    buttonSheet: {
        position: 'relative',
        top: 0,
        left: 0,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

})