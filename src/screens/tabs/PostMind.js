import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, StyleSheet, Alert, LogBox, ImageBackground, ScrollView, ActivityIndicator } from 'react-native'
import ImagePicker from "react-native-image-crop-picker"
import { Header } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Modalize } from 'react-native-modalize'
import {
    ViewLabel, LabelHeader, LabelIntro,
    ButtonArea, ButtonForm, ButtonText,
} from '../../styles/ChangeImageSheetStyle'

import PostInput from '../../components/PostInput'
import { createNewPost } from '../../api'
import { uploadPic } from '../../../firebase/logicImage'

LogBox.ignoreAllLogs();//Ignore all log notifications

export default function PostMind({ navigation }) {
    const [newPost, setNewPost] = useState({
        status: null,
        image: null,
    })

    const [pathImg, setPathImg] = useState({
        path: null,
        mime: null,
    })

    const [showReload2, setShowReload2] = useState(false)

    //bottom sheet
    const modalizeRef = React.useRef(null);
    const onCloseBottomSheet = () => {
        modalizeRef.current?.close();
    }
    const onOpenBottomSheet = () => {
        modalizeRef.current?.open();
    }

    //handle open library picture
    const OpenLibrary = () => {
        ImagePicker.openPicker({
            width: 350,
            height: 350,
            cropping: true,
        }).then(async image => {
            console.log(image);
            setPathImg({
                path: image.path,
                mime: image.mime,
            })
            setNewPost({ ...newPost, image: image.path })
        }).catch(e => { // Fix err user cancel
            if (e.code !== 'E_PICKER_CANCELLED') {
                console.log(e);
                Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
            }
        })
    }
    //handle open camera button
    const TakeCamera = () => {
        //alert('clicked');
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(async image => {
            console.log(image);
            let a = await uploadPic(image.path, image.mime)
            console.log('uri::', a)
            setUploadUProfile({ avatar: image.path })
        }).catch(e => {// Fix err user cancel
            if (e.code !== 'E_PICKER_CANCELLED') {
                console.log(e);
                Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
            }
        })
    }

    //delete Img
    const handleRemove = () => {
        setNewPost({ ...newPost, image: null })
        setPathImg({
            path: '',
            mime: '',
        })
    }

    //create new Post
    const submitPost = async (data) => {
        if (pathImg.path) {
            let a = await uploadPic(pathImg.path, pathImg.mime)
            newPost.image = a
            // setUploadUProfile({ ...uploadProfile, avatar: a })
            createNewPost(data)
                .then(post => {
                    Alert.alert(
                        //Title
                        post.msg,
                        //Body
                        "Create post successfully!",
                        [
                            {
                                text: 'Yes',
                                onPress: async () => {
                                    const seconds = Math.floor(Math.random() * 1600) + 950
                                    setShowReload2(true)
                                    setTimeout(() => {
                                        navigation.goBack()
                                    }, seconds);

                                }
                            },
                        ]
                    )
                })
        }
        else
            Alert.alert(

                'Failed!',
                `Don't have image`
            )

    }

    const ChangeImageSheet = () => {
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
                        <LabelHeader>Upload Photo</LabelHeader>
                        <LabelIntro>Choose Your Profile Picture</LabelIntro>
                    </ViewLabel>
                }>
                <SafeAreaView style={styles.containerSheet}>
                    <ButtonArea>
                        <ButtonForm onPress={TakeCamera}>
                            <ButtonText>Take Photo</ButtonText>
                        </ButtonForm>
                        <ButtonForm>
                            <ButtonText onPress={OpenLibrary}>Choose From Library</ButtonText>
                        </ButtonForm>
                        <ButtonForm onPress={handleRemove}>
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

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    })

    if (showReload2 == true) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="arrow-back"
                            size={30}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => submitPost(newPost)}>
                        <Text style={styles.buttonText}>Upload</Text>
                    </TouchableOpacity>
                }
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}
            />
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        // underlineColorAndroid="transparent"
                        placeholder="Type something"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(value) => { setNewPost({ ...newPost, status: value }) }}
                    />
                </View>
                {
                    (pathImg.path) ? (
                        <ImageBackground source={{ uri: pathImg.path }} style={{ flex: 1, resizeMode: 'cover', width: '100%', height: 300 }} />
                    ) : (<></>)
                }

                <TouchableOpacity onPress={onOpenBottomSheet} activeOpacity={0.7}>
                    <PostInput
                        check="1"
                        iconType='image'
                        namePost='Upload Image' />
                </TouchableOpacity>

                {/* <PostInput
                iconType='grid-outline'
                namePost='Select Category' />
            <PostInput
                iconType='list'
                namePost='Create wishlist' />
            <PostInput
                iconType='lock-closed-outline'
                namePost='Strict'
                checkDescript="1"
                textDescript='Only allow to initiate a swap if user has item on wishlist' /> */}
            </ScrollView>

            <ChangeImageSheet
                modalizeRef={modalizeRef}>

            </ChangeImageSheet>
        </View >
    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textAreaContainer: {
        padding: 5,
        width: '100%',
    },
    textArea: {
        height: 150,
        fontSize: 18,
        justifyContent: "flex-start",
        color: '#000',
    },
    button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 12,
        textAlign: 'center',
        backgroundColor: '#2289ff',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: '500'
    },
    containerSheet: {
        flex: 1,
        marginHorizontal: 15,
        // backgroundColor: '#ccc',
    },
    handleView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        // width: '100%',
    },
    fontIcon: {
        flexDirection: 'row',
    },
})
