import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {
    Container, BodyContent, HeaderBodyContent,
    ButtonShow, Label
} from '../../styles/PhotoDiscoverStyle'
import PhotoPostCard from '../../components/PhotoPostCard'


const PostsPhoto = [
    {
        id: 1,
        photoList: [
            {
                id: 1,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Ffashion-2539879_1280.jpg?alt=media&token=82e98bb8-c201-466a-bf06-e627616c5508'
            },
            {
                id: 2,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Ffashion-2539879_1280.jpg?alt=media&token=82e98bb8-c201-466a-bf06-e627616c5508'
            }
        ]
    },
    {
        id: 2,
        photoList: [
            {
                id: 1,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fpanther-hd-black-panther-wallpaper-preview.jpg?alt=media&token=22bc5e81-70a0-49d2-b7a9-13f7424b5d25'
            },
            {
                id: 2,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fpanther-hd-black-panther-wallpaper-preview.jpg?alt=media&token=22bc5e81-70a0-49d2-b7a9-13f7424b5d25'
            }
        ]
    },
    {
        id: 3,
        photoList: [
            {
                id: 1,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fpanther-hd-black-panther-wallpaper-preview.jpg?alt=media&token=22bc5e81-70a0-49d2-b7a9-13f7424b5d25'
            },
            {
                id: 2,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fpanther-hd-black-panther-wallpaper-preview.jpg?alt=media&token=22bc5e81-70a0-49d2-b7a9-13f7424b5d25'
            }
        ]
    }
]

export default function PhotoDiscoverScreen() {
    useEffect(() => {
        console.log('PhotoPostCard')
    }, [])
    return (
        <Container>
            <BodyContent>
                <View>
                    <HeaderBodyContent>
                        <Label>Discover what's popular</Label>
                        <ButtonShow activeOpacity={0.8}>
                            <Text
                                style={{ color: "#1869ff", fontSize: 16, fontWeight: '600' }}>
                                View All
                            </Text>
                        </ButtonShow>
                    </HeaderBodyContent>
                </View>
                {
                    PostsPhoto.map(item => {
                        const height = Math.floor(Math.random() * 80) + 200
                        console.log(height)
                        return (
                            <View
                                style={{ marginTop: 2 }}
                                key={item.id}>
                                <PhotoPostCard
                                    item={item}
                                    height={height} />
                            </View>
                        )
                    })
                }
            </BodyContent>
        </Container >

    )
}
