import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

import { View, TouchableOpacity, StyleSheet, Alert, LogBox } from 'react-native'
import { Header } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    SafeAreaView, Container,
    UserImgContainer, UserImg,
    Label, TextInput,
    IntroText,
} from '../../styles/EditProfileStyle'

//main window EditPersonalProfile here!
const EditPersonalProfileStack = ({ navigation, route }) => {
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

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Container nestScrollViewEnabled={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <UserImgContainer>
                        <UserImg source={require("../../assets/images/user1.jpg")} imageStyle={{ borderRadius: 65 }} >
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Icon
                                    name='camera'
                                    size={35}
                                    style={{
                                        opacity: 0.5,
                                        color: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        padding: 2,
                                        borderColor: '#fff',

                                    }} />
                            </View>
                        </UserImg>
                    </UserImgContainer>
                </View>

                <>
                    <View>
                        <Label>Name</Label>
                        <TextInput defaultValue={route.params.name} />
                    </View>
                    <View>
                        <Label>Email Address</Label>
                        <TextInput defaultValue='pvlm' />
                    </View>
                    <View>
                        <Label>Date of Birth</Label>
                        <TextInput />
                    </View>
                    <View>
                        <Label>Introduction</Label>
                        <IntroText
                            placeholder="Type something"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 15 }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Label>Sex</Label>
                            <>
                                <DropDownPicker
                                    placeholder="Select sex"
                                    dropDownDirection="TOP"
                                    placeholderStyle={{ fontSize: 17, fontStyle: 'italic' }}
                                    containerStyle={{ width: '92%' }}
                                    textStyle={{ fontSize: 17 }}
                                    open={openSex}
                                    value={valueSex}
                                    items={itemsSex}
                                    setOpen={setOpenSex}
                                    setValue={setValueSex}
                                    setItems={setItemsSex}
                                    onChangeValue={(value) => console.log(value)}
                                />
                            </>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Label>Work</Label>
                            <>
                                <DropDownPicker
                                    placeholder="Select work"
                                    dropDownDirection="TOP"
                                    placeholderStyle={{ fontSize: 17, fontStyle: 'italic' }}
                                    textStyle={{ fontSize: 17 }}
                                    open={openWork}
                                    value={valueWork}
                                    items={itemsWork}
                                    setOpen={setOpenWork}
                                    setValue={setValueWork}
                                    setItems={setItemsWork}
                                    onChangeValue={(value) => console.log(value)}
                                />
                            </>
                        </View>
                    </View>
                </>
            </Container >
        </SafeAreaView >
    )
}

export default function EditPersonalProfile({ navigation, route }) {
    //handle close Icon
    const cancelEdit = () => {

    }

    //handle check Icon
    const acceptEdit = () => {

    }
    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => cancelEdit()}>
                        <AntDesign
                            name="close"
                            size={30}
                            color="#000" />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity onPress={() => acceptEdit()}>
                        <AntDesign
                            name="check"
                            size={30}
                            color="#000" />
                    </TouchableOpacity>
                }
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    padding: 0,
                    justifyContent: 'space-around',
                }}
            />
            <EditPersonalProfileStack route={route} navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    fontIcon: {
        flexDirection: 'row',
    },
})