import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { fetchDataProfile, getThisPost } from '../../api'
import PostCard from '../../components/PostCard'
import AnimatedBottomSheet from '../../components/AnimatedBottomSheet'

export default function PostScreen({ route }) {
    const isFocused = useIsFocused()
    const { idPost } = route.params
    const [item, setItem] = useState('')
    const [name, setName] = useState('')

    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);
    const onOpenBottomSheet = (idPost) => {
        console.log(idPost)
        modalizeRef.current?.open(idPost);
    }

    useEffect(async () => {
        await getThisPost(idPost).then(async (data) => {
            // console.log(data)
            setItem(data)
            await fetchDataProfile().then(data => {
                // console.log(data)
                setName(data.name)
                console.log(name)
            })
        })
    }, [isFocused])

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: '#fff' }}>
            <ScrollView style={{ width: '100%', marginTop: 15 }}>
                <PostCard
                    onOpenBottomSheet={onOpenBottomSheet}
                    modalizeRef={modalizeRef}
                    key={item._id}
                    item={item}
                    id={item.id_User}
                    avatar={item.image}
                    name={name} />
            </ScrollView>
            <AnimatedBottomSheet
                id={item.id_User}
                modalizeRef={modalizeRef}
            />
        </SafeAreaView>

    )
}
