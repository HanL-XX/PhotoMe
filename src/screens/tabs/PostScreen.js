import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { fetchDataProfile, getThisPost } from '../../api'
import PostCard from '../../components/PostCard'

export default function PostScreen({ route }) {
    const isFocused = useIsFocused()
    const { idPost } = route.params
    const [item, setItem] = useState('')
    const [name, setName] = useState('')
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <PostCard
                key={item._id}
                item={item}
                id={item.id_User}
                avatar={item.image}
                name={name} />
        </SafeAreaView>

    )
}
