import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from "react-native-image-crop-picker"

import { View, TouchableOpacity, StyleSheet, Alert, LogBox, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';

import {
    SafeAreaView, Container,
    UserImgContainer, UserImg,
    Label, TextInput,
    IntroText,
} from '../../styles/EditProfileStyle'
import {
    ViewLabel, LabelHeader, LabelIntro,
    ButtonArea, ButtonForm, ButtonText,
} from '../../styles/ChangeImageSheetStyle'

import { Modalize } from 'react-native-modalize'
import { uploadPic, deletePic } from '../../../firebase/handleFirebase'

//main window EditPersonalProfile here!
export default function EditPersonalProfile({ navigation, route }) {
    const onCloseBottomSheet = () => {
        modalizeRef.current?.close();
    }
    const onOpenBottomSheet = () => {
        modalizeRef.current?.open();
    }
    //route params
    const dataUser = route.params //name && avatar && id && intro

    //bottom sheet
    const modalizeRef = React.useRef(null);

    const [showReload1, setShowReload1] = useState(false)
    const [showReload2, setShowReload2] = useState(false)

    const [uploadProfile, setUploadUProfile] = useState({
        id_User: dataUser.id,
        avatar: dataUser.avatar,
        name: dataUser.name,
        // email: '',
        intro: dataUser.intro,
        sex: null,
        work: null,
    })

    //data Sex
    const [openSex, setOpenSex] = useState(false);
    const [valueSex, setValueSex] = useState(null);
    const [itemsSex, setItemsSex] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ]);
    //data Work
    const [openWork, setOpenWork] = useState(false);
    const [valueWork, setValueWork] = useState(null);
    const [itemsWork, setItemsWork] = useState([
        { label: 'Photographer', value: 'photographer' },
        { label: 'Cameraman', value: 'cameraman' },
        { label: 'Creator', value: 'creator' },
        { label: 'Model', value: 'model' },
        { label: 'People', value: 'people' },
    ]);

    //handle close Icon
    const cancelEdit = () => {
        Alert.alert(
            //Title
            'Unsaved Changes',
            //Body
            "Haven't saved your changes. Do you want to cancel?",
            [
                {
                    text: 'Yes',
                    onPress: () => navigation.goBack()
                },
                {
                    text: 'No',
                }
            ]
        )
    }

    //handle check Icon
    const acceptEdit = (data) => {
        axios({
            method: 'PUT',
            url: `http://localhost:3000/api/profile/updateprofile`,
            data: data,
        })
            .then(response => {
                Alert.alert(
                    //Title
                    response.data.msg,
                    //Body
                    "Update successfully!",
                    [
                        {
                            text: 'Yes',
                            onPress: async () => {
                                const seconds = Math.floor(Math.random() * 1500) + 900
                                setShowReload2(true)
                                setTimeout(() => {
                                    navigation.goBack()
                                }, seconds);

                            }
                        },
                    ]
                )
                // alert(response.data.msg)
            })
            .catch(err => {
                const seconds = Math.floor(Math.random() * 1000) + 500
                setShowReload1(true)
                setTimeout(() => {
                    navigation.goBack()
                }, seconds);
                console.log("ERR!: " + err)
            })
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    //handle open library picture
    const OpenLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        }).then(async image => {
            console.log(image);
            // let a = await uploadPic(image.path, image.mime)
            // console.log('uri::', a)
            setUploadUProfile({ avatar: image.path })
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
        }).catch(e => {// Fix err user cancel
            if (e.code !== 'E_PICKER_CANCELLED') {
                console.log(e);
                Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
            }
        })
    }
    //handle delete picture
    const DeletePic = () => {
        deletePic(picInfo.uri)
        setPicInfo({
            uri: null
        });
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
                        <ButtonForm onPress={DeletePic}>
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

    if (showReload2 == true) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.handleView}>
                <TouchableOpacity onPress={cancelEdit}>
                    <AntDesign
                        name="close"
                        size={30}
                        color="#000" />
                </TouchableOpacity>
                {
                    showReload1 == true ? (
                        // <View style={{ flex: 1, backgroundColor: 'red' }}>
                        <ActivityIndicator size='small' hidesWhenStopped={false} />
                        // </View>
                    ) : (
                        <TouchableOpacity onPress={() => acceptEdit(uploadProfile)}>
                            <AntDesign
                                name="check"
                                size={30}
                                color="#000" />
                        </TouchableOpacity>
                    )
                }
            </View>
            <Container nestScrollViewEnabled={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <UserImgContainer onPress={onOpenBottomSheet} activeOpacity={0.7}>
                        <UserImg source={{ uri: uploadProfile.avatar }} imageStyle={{ borderRadius: 65 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Icon
                                    name='camera'
                                    size={35}
                                    style={{
                                        opacity: 1,
                                        color: '#eee',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        padding: 2,
                                        borderColor: '#eee',

                                    }} />
                            </View>
                        </UserImg>
                    </UserImgContainer>
                </View>

                <>
                    <View>
                        <Label>Name</Label>
                        <TextInput
                            // value={dataUser.name}
                            defaultValue={dataUser.name}
                            onChangeText={(value) => { setUploadUProfile({ ...uploadProfile, name: value }) }} />
                    </View>
                    <View>
                        <Label>Email Address</Label>
                        <TextInput
                            onChangeText={(value) => { setUploadUProfile({ ...uploadProfile, email: value }) }} />
                    </View>
                    <View>
                        <Label>Date of Birth</Label>
                        <TextInput />
                    </View>
                    <View>
                        <Label>Introduction</Label>
                        <IntroText
                            defaultValue={dataUser.intro}
                            placeholder="Type something"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                            onChangeText={(value) => { setUploadUProfile({ ...uploadProfile, intro: value }) }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 15 }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Label>Sex</Label>
                            <>
                                <DropDownPicker
                                    placeholder="Select sex"
                                    dropDownDirection="TOP"
                                    dropDownContainerStyle={{ borderWidth: 1, borderColor: '#aaa' }}
                                    style={{ borderWidth: 0.5, borderColor: '#aaa' }}
                                    placeholderStyle={{ fontSize: 17, fontStyle: 'italic' }}
                                    containerStyle={{ width: '92%' }}
                                    textStyle={{ fontSize: 17 }}
                                    open={openSex}
                                    value={valueSex}
                                    items={itemsSex}
                                    setOpen={setOpenSex}
                                    setValue={setValueSex}
                                    setItems={setItemsSex}
                                    onChangeValue={(value) => { setUploadUProfile({ ...uploadProfile, sex: value }) }}

                                />
                            </>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Label>Work</Label>
                            <>
                                <DropDownPicker
                                    placeholder="Select work"
                                    dropDownDirection="TOP"
                                    dropDownContainerStyle={{ borderWidth: 1, borderColor: '#aaa' }}
                                    style={{ borderWidth: 0.5, borderColor: '#aaa' }}
                                    placeholderStyle={{ fontSize: 17, fontStyle: 'italic' }}
                                    textStyle={{ fontSize: 17 }}
                                    open={openWork}
                                    value={valueWork}
                                    items={itemsWork}
                                    setOpen={setOpenWork}
                                    setValue={setValueWork}
                                    setItems={setItemsWork}
                                    onChangeValue={(value) => { setUploadUProfile({ ...uploadProfile, work: value }) }}
                                />
                            </>
                        </View>
                    </View>
                </>
            </Container>
            <ChangeImageSheet
                modalizeRef={modalizeRef}>

            </ChangeImageSheet>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
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