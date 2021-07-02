import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {
    HeaderBar,
    UserImg, UserInfo,
    UserName, UserFollow,
    ListImg, ImgView,
} from '../styles/PeoplePostCardStyle'


export default function PeoplePostCard({ item, navigation }) {
    return (
        <View>
            <HeaderBar>
                <UserInfo>
                    <UserImg source={{ uri: item.avatar }} />
                    <View style={{ flexDirection: 'column', marginLeft: 7, justifyContent: 'space-around' }}>
                        <UserName>{item.name}</UserName>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <UserFollow>
                                {item.followers} Followers
                            </UserFollow>
                            <Text> • </Text>
                            <Text style={{ color: '#0044d6', fontSize: 14.5 }}>Follow</Text>
                        </View>
                    </View>
                </UserInfo>
                <TouchableOpacity activeOpacity={1}>
                    <EvilIcons
                        size={24}
                        name='close'
                    />
                </TouchableOpacity>
            </HeaderBar>
            <ListImg>
                {
                    item.imgList.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.8}
                            style={{ flex: 1, margin: 1 }}
                            onPress={() => {
                                navigation.navigate("NewPostCard")
                            }}>

                            <ImgView
                                source={{ uri: item.source }} />
                        </TouchableOpacity>
                    ))
                }
            </ListImg>
        </View>
    )
}
