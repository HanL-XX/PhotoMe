import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { fetchDataProfile, getThisPost } from '../../api'
import PostCard from '../../components/PostCard'
import AnimatedBottomSheet from '../../components/AnimatedBottomSheet'
import AsyncStorage from '@react-native-community/async-storage'

export default function PostScreen({ navigation, route }) {
    const isFocused = useIsFocused()
    const { idPost } = route.params
    const [item, setItem] = useState('')
    const [infoUser, setInfoUser] = useState({
        name: '',
        avatar: null,
        iconjob: null,
    })

    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);
    const onOpenBottomSheet = (idPost) => {
        console.log(idPost)
        modalizeRef.current?.open(idPost);
    }

    useEffect(async () => {
        const id_User = await AsyncStorage.getItem('userId_Key')
        console.log(id_User)
        await getThisPost(idPost).then(async (data) => {
            setItem(data)
            await fetchDataProfile(id_User).then(data => {
                setInfoUser({ name: data.name, avatar: data.avatar, iconjob: data.iconjob })
            })
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: '#fff' }}>
            <ScrollView style={{ width: '100%', marginTop: 15 }}>
                <PostCard
                    navigation={navigation} //move between 2 screens
                    onOpenBottomSheet={onOpenBottomSheet}
                    modalizeRef={modalizeRef}
                    key={item._id}
                    item={item}
                    id={item.id_User}
                    avatar={infoUser.avatar}
                    iconjob={infoUser.iconjob}
                    name={infoUser.name} />
            </ScrollView>
            <AnimatedBottomSheet
                id={item.id_User}
                modalizeRef={modalizeRef}
            />
        </SafeAreaView>

    )
}
