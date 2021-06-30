import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import {
    ImageContainer, ImgView
} from '../styles/PhotoPostCardStyle'

export default function PhotoPostCard({ item, height }) {
    return (
        <View>
            <ImageContainer>
                {
                    item.photoList.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.8}
                            style={{ flex: 1, marginHorizontal: 1, height: height }}
                            onPress={() => console.log(item.id)}>

                            <ImgView
                                source={{ uri: item.source }} />
                        </TouchableOpacity>
                    ))
                }

            </ImageContainer>
        </View>
    )
}


