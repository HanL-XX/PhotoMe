import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { TapGestureHandler } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { windowWidth } from '../utils/Dimensions.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function AnimatedBottomSheet({ modalizeRef, userName }) {
    // const modalizeRef = React.useRef(null);
    // const onOpenBottomSheet = () => {
    //     modalizeRef.current?.open()
    // }
    return (
        <Modalize
            ref={modalizeRef}
            snapPoint={200}
            modalHeight={200}
            style={{ overflow: 'hidden' }} >
            <View style={styles.containerSheet}>
                {userName ? (
                    <TouchableOpacity style={styles.buttonSheet}>
                        <Text style={{ fontSize: 18, color: '#c94646' }}>Delete</Text>
                        <Ionicons
                            name='trash-bin'
                            size={23} />
                    </TouchableOpacity>)
                    : <></>
                }
                <TouchableOpacity style={styles.buttonSheet}>
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
                </TouchableOpacity>
            </View>
        </Modalize>
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
        height: 200,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    buttonSheet: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

})