import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { TapGestureHandler } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { windowWidth } from '../utils/Dimensions.js'

export default function AnimatedBottomSheet({ modalizeRef }) {
    // const modalizeRef = React.useRef(null);
    // const onOpenBottomSheet = () => {
    //     modalizeRef.current?.open()
    // }
    return (

        <Modalize
            ref={modalizeRef}
            snapPoint={300}
            modalHeight={300} >
            <View style={styles.container}>
                <Text>Modal Sheet</Text>
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
    }

})