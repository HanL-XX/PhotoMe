import React, { useState, useEffect } from 'react'
import { useIsFocused } from "@react-navigation/native";
import { Header } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import _ from "lodash"
import { View, TouchableOpacity, Text, ScrollView, Modal, StyleSheet, Image, Button } from 'react-native'
import {
    SafeAreaView, Container,
    FormSearch, InputSearch,
    ModalBackground, ModalContainer,
    ModalButton, ModalImage,
    TextWarning, TextName,
    TouchButton, TextUnfollow, TextCancel,
} from '../../styles/FollowStyle'
import FollowingCard from '../../components/FollowingCard'
import { fetchDataProfile } from '../../api'
import { getFollowingById, activeUnfollow } from '../../api/followProfile'
//change Following in here!
const FollowingStackScreen = ({ navigation, route }) => {
    const isFocused = useIsFocused(); //refresh when goBack here!!!
    const [showModal, setShowModal] = useState(false)
    const [reload, setReload] = useState(false)
    const [search, setSearch] = useState({
        data: [],
        refresh: true,
        query: '',
        listSearch: []
    })
    const [followUser, setFollowUser] = useState({
        id_User: null,
        avatar: '',
        name: null,
    })

    const fetchDataFollowing = async () => {
        await getFollowingById().then(listId => {
            let listDataFollowing = []
            listId.map(async (id) => {
                await fetchDataProfile(id).then(data => {
                    listDataFollowing.push(data)
                })
                setSearch({ ...search, data: listDataFollowing, listSearch: listDataFollowing })
            })
        })
    }

    // const handleRefresh = async () => {
    //     setSearch({ ...search, refresh: false })
    //     await fetchDataFollowing()
    // }

    const onChangeSearch = (e) => {
        if (e) {
            const searchData = _.filter(search.data, (item) => {
                const name = `${item.name}`
                const itemData = name ? name.toUpperCase() : ''.toUpperCase();
                const textData = e.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            // console.log(searchData)
            setSearch({ ...search, query: e, refresh: false, listSearch: searchData })
        } else {
            setSearch({ ...search, query: e, refresh: false, listSearch: search.data })
        }
    }

    //unfollow
    const handleUnfollow = (id_User, avatar, name) => {
        setFollowUser({
            id_User: id_User,
            avatar: avatar,
            name: name,
        })
        setShowModal(true)
    }

    const decideUnfollow = async (id_User) => {
        await activeUnfollow(id_User).then(res => {
            setReload(true)
            setShowModal(false)
        })

    }

    useEffect(async () => {
        await fetchDataFollowing()
        // await handleRefresh()
    }, [reload])

    return (
        <SafeAreaView>
            <Container>
                <View style={{ alignItems: 'center' }}>
                    <FormSearch>
                        <Feather
                            name="search"
                            size={24}
                            style={{ color: '#555' }}
                        />
                        <InputSearch
                            placeholder="Search here..."
                            placeholderTextColor="#666"
                            value={search.query}
                            onChangeText={onChangeSearch}
                        />

                    </FormSearch>
                </View>
                <View style={{ marginVertical: 15, height: 1.5, width: '100%', backgroundColor: '#eee' }}></View>
                <ScrollView>
                    {
                        search.listSearch.map(item => (
                            <FollowingCard
                                key={item.id_User}
                                item={item}
                                handleUnfollow={handleUnfollow}
                                onPress={() => navigation.navigate('ProfileUserScreen', { id_User: item.id_User })} />
                        ))
                    }
                </ScrollView>
            </Container>
            <Modal transparent visible={showModal}>
                <ModalBackground>
                    <ModalContainer>
                        <ModalImage
                            source={{ uri: followUser.avatar }}
                        />
                        <TextWarning>
                            If change your mind, you will request to follow back <TextName>{followUser.name}</TextName>
                        </TextWarning>
                        <ModalButton>
                            <TouchButton
                                style={styles.borderTop}
                                activeOpacity={0.5}
                                onPress={() => decideUnfollow(followUser.id_User)}

                            >
                                <TextUnfollow>Unfollowing</TextUnfollow>
                            </TouchButton>
                            <TouchButton
                                style={styles.borderTop}
                                activeOpacity={0.5}
                                onPress={() => setShowModal(false)}
                            >
                                <TextCancel>Cancel</TextCancel>
                            </TouchButton>
                        </ModalButton>
                    </ModalContainer>
                </ModalBackground>
            </Modal>
        </SafeAreaView>
    )
}

export default function FollowingScreen({ navigation, route }) {
    const { countFollowing } = route.params
    return (
        <View style={{
            flex: 1, flexDirection: 'column'
        }}>
            <Header
                leftComponent={
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="arrow-back"
                            size={30}
                        />
                    </TouchableOpacity>
                }
                centerComponent={
                    <View style={{ width: '100%' }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: '500',
                            color: '#333',
                        }}>
                            <Text style={{
                                fontWeight: '600',
                                color: '#222',
                            }}>
                                {countFollowing}
                            </Text> Following
                        </Text>
                    </View>
                }
                centerContainerStyle={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}
            />
            <FollowingStackScreen navigation={navigation} route={route} />
        </View >
    )
}

const styles = StyleSheet.create({
    borderTop: {
        borderTopWidth: 1,
        borderColor: '#ccc',
    }

})