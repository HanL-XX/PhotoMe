import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
// import { TapGestureHandler } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { windowWidth } from '../utils/Dimensions.js'
import {
    ViewLabel, Label, LabelIntro,
    ButtonArea, ButtonForm, ButtonText,
} from '../styles/ChangeImageSheetStyle'

export default function ChangeImageSheet({ modalizeRef }) {
    const onCloseBottomSheet = () => {
        modalizeRef.current?.close();
    }

    return (
        <Modalize
            ref={modalizeRef}
            snapPoint={360}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
            modalHeight={360}
            closeAnimationConfig={{ timing: { duration: 400 }, spring: { speed: 10, bounciness: 5 } }}
            handlePosition="inside"
            HeaderComponent={
                <ViewLabel>
                    <Label>Upload Photo</Label>
                    <LabelIntro>Choose Your Profile Picture</LabelIntro>
                </ViewLabel>
            }>
            <SafeAreaView style={styles.containerSheet}>

                <ButtonArea>
                    <ButtonForm>
                        <ButtonText>Take Photo</ButtonText>
                    </ButtonForm>
                    <ButtonForm>
                        <ButtonText>Choose From Library</ButtonText>
                    </ButtonForm>
                    <ButtonForm>
                        <ButtonText>Remove Photo</ButtonText>
                    </ButtonForm>
                    <ButtonForm
                        style={{ backgroundColor: '#ff4f4f' }}
                        onPress={onCloseBottomSheet}>
                        <ButtonText>Cancel</ButtonText>
                    </ButtonForm>
                </ButtonArea>
            </SafeAreaView>
        </Modalize>
    )
}


const styles = StyleSheet.create({
    containerSheet: {
        flex: 1,
        marginHorizontal: 15,
        // backgroundColor: '#ccc',
    },

})