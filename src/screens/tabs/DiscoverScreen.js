import React from 'react'
import { View, Text } from 'react-native'
import {
    SafeAreaView,
    Container, HeaderBar,
    UserInfo, UserImg,
    FormInput, FormInputText,
    BodyContent, HeaderBodyContent,
    Label, ButtonShow,
} from '../../styles/DiscoverStyle'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import NewPostCard from '../../components/NewPostCard'

const Posts = [
    {
        id: 1,
        name: "Junior Asiama",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Ffashion-2539879_1280.jpg?alt=media&token=82e98bb8-c201-466a-bf06-e627616c5508',
        followers: 344,
        imgList: [
            {
                id: 1,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Ffashion-2539879_1280.jpg?alt=media&token=82e98bb8-c201-466a-bf06-e627616c5508',
            },
            {
                id: 2,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fphoto-1568605114967-8130f3a36994.jpeg?alt=media&token=e93dc130-f71e-4a5b-9892-3b93f0cab120',
            },
            {
                id: 3,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fpanther-hd-black-panther-wallpaper-preview.jpg?alt=media&token=22bc5e81-70a0-49d2-b7a9-13f7424b5d25',
            }
        ]
    },
    {
        id: 2,
        name: "John Tylor",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fpanther-hd-black-panther-wallpaper-preview.jpg?alt=media&token=22bc5e81-70a0-49d2-b7a9-13f7424b5d25',
        followers: 9854,
        imgList: [
            {
                id: 1,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fpanther-hd-black-panther-wallpaper-preview.jpg?alt=media&token=22bc5e81-70a0-49d2-b7a9-13f7424b5d25',
            },
            {
                id: 2,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2FVolorful-parrot-animal-wallpaper-HD.jpeg?alt=media&token=95bc6a68-db38-4872-a6d2-87ecf314c763',
            },
            {
                id: 3,
                source: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2F1624704851844.jpg?alt=media&token=cc3735ab-212a-4082-b03b-8dcc0630c0db',
            },
        ]
    },
]

const dataImg = {
    source: {
        avatar: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2F1624704851844.jpg?alt=media&token=cc3735ab-212a-4082-b03b-8dcc0630c0db'
    }
}
export default function DiscoverScreen() {
    return (
        <SafeAreaView>
            <Container>
                <HeaderBar>
                    <UserInfo activeOpacity={1}>
                        <UserImg source={{ uri: dataImg.source.avatar }} />
                    </UserInfo>
                    <FormInput>
                        <EvilIcons
                            size={24}
                            name="search"
                            style={{ color: "#444" }}
                        />
                        <FormInputText
                            placeholder="Search PhotoMe" />
                    </FormInput>
                </HeaderBar>

                <BodyContent>
                    <HeaderBodyContent>
                        <Label>Featured Photographers</Label>
                        <ButtonShow>
                            <Text
                                style={{ color: "#1869ff", fontSize: 15.5, fontWeight: '600' }}>
                                View All
                            </Text>
                        </ButtonShow>
                    </HeaderBodyContent>
                    {
                        Posts.map(item => (
                            <View key={item.id}>
                                <NewPostCard
                                    item={item} />
                            </View>
                        ))
                    }

                </BodyContent>
            </Container>
        </SafeAreaView>
    )
}
