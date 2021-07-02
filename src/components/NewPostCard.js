import React, { useState, useEffect } from 'react'
import {
    View, Text,
    Image, StyleSheet,
    Platform, StatusBar,
    TouchableOpacity, ScrollView
} from 'react-native'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import {
    Status, UserImg, ContentInfo, ButtonBar,
    IconJob, CountReact, NameCard, StatusCard,
    ReactInfo, Wrapper, NameReact, ImagePopular,
    ButtonTag, NameTag
} from '../styles/NewPostCardStyle'
import { windowWidth } from '../utils/Dimensions'
import { iconJob } from '../config/globalIcon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import { popularIcon } from '../config/globalIcon'


const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55
const MAX_HEIGHT = 400
const tags = ['Home', 'No people', 'Tree', 'Beauty']

export default function NewPostCard({ item }) {
    const [liked, setLiked] = useState(false)
    const [countReact, setCountReact] = useState({
        likes: 552,
        comments: 106,
    })
    //handle event to react
    const _onPressReact = async () => {
        setLiked(!liked)
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <ImageHeaderScrollView
                bounces={false}
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0.2}
                renderHeader={() => (
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fphoto-1568605114967-8130f3a36994.jpeg?alt=media&token=e93dc130-f71e-4a5b-9892-3b93f0cab120' }} />
                )}>
                <TriggeringView
                    style={styles.section}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <ButtonBar />
                    </View>
                    <ContentInfo>
                        <View style={styles.containerReact}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={_onPressReact}>
                                <Ionicons
                                    name={liked ? "heart" : "heart-outline"}
                                    style={{ color: liked ? '#e03636' : '#444' }}
                                    size={38} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                                <Ionicons
                                    name="chatbox-outline"
                                    style={{ color: '#444' }}
                                    size={36} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                                <MaterialCommunityIcons
                                    name="plus-box-multiple-outline"
                                    style={{ color: '#444' }}

                                    size={36} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Feather
                                name="more-vertical"
                                size={28}
                                style={{ color: '#444' }} />
                        </TouchableOpacity>
                    </ContentInfo>
                    <View style={{ width: '100%' }}>
                        <View style={[styles.flexRow, { justifyContent: 'space-between', marginBottom: 10 }]}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Status>My home ^^ (Status)</Status>
                                <NameCard>by
                                    <Text style={{ fontWeight: '600' }}> (name) </Text>
                                    <IconJob
                                        style={{ resizeMode: 'cover' }}
                                        source={iconJob.icons['creator']} />
                                    <NameCard> • (date) </NameCard>
                                </NameCard>
                            </View>
                            <TouchableOpacity>
                                <UserImg source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/photome-test1.appspot.com/o/images%2Fwallpaper%2Fphoto-1568605114967-8130f3a36994.jpeg?alt=media&token=e93dc130-f71e-4a5b-9892-3b93f0cab120' }} />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={[styles.flexRow]}>
                            <ReactInfo
                                activeOpacity={0.8}>
                                <StatusCard>225 Likes</StatusCard>
                                <Feather
                                    name="chevron-right"
                                    size={20} />
                            </ReactInfo>
                            <StatusCard> • </StatusCard>
                            <ReactInfo
                                activeOpacity={0.8}>
                                <StatusCard>6 Comments</StatusCard>
                                <Feather
                                    name="chevron-right"
                                    size={20} />
                            </ReactInfo>
                        </View> */}
                    </View>
                </TriggeringView>
                <Wrapper
                    bounces={false}
                    showsVerticalScrollIndicator={false}>
                    <NameCard style={{ fontSize: 17, marginVertical: 10 }}>
                        <Ionicons
                            name="location-sharp"
                            size={25} />
                        Ho Chi Minh, Viet Nam
                    </NameCard>
                    <View style={[styles.flexRow, { width: '100%', justifyContent: 'space-between', marginTop: 7 }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <NameReact>Likes</NameReact>
                                <Feather
                                    style={{ marginLeft: 2 }}
                                    name="info"
                                    size={25}
                                />
                            </View>
                            <CountReact> {countReact.likes} </CountReact>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <NameReact>Comments</NameReact>
                                <Feather
                                    style={{ marginLeft: 2 }}
                                    name="info"
                                    size={25}
                                />
                            </View>
                            <CountReact> {countReact.comments} </CountReact>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <NameReact>Popular</NameReact>
                                <Feather
                                    style={{ marginLeft: 2 }}
                                    name="info"
                                    size={25}
                                />
                            </View>
                            <CountReact>
                                {(countReact.likes >= 500) ? (
                                    //likes
                                    <ImagePopular source={popularIcon.popular['most_react']} />
                                ) : (<></>)}
                                {(countReact.comments >= 100) ? (
                                    //comments
                                    <ImagePopular source={popularIcon.popular['champion']} />
                                ) : (<></>)}
                                <MaterialCommunityIcons
                                    name="fire"
                                    size={33}
                                    style={{ color: '#444' }}
                                />
                            </CountReact>

                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                            <Ionicons
                                name="camera"
                                size={35}
                                style={{ marginRight: 20 }}
                            />
                            <NameReact style={{ textTransform: 'uppercase' }}>NIKON D850
                            </NameReact>
                            <Feather
                                name="chevron-right"
                                size={25}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                            <Octicons
                                name="settings"
                                size={35}
                                style={{ marginRight: 20 }}
                            />
                            <NameReact>24mm f/4.0 1/1600s ISO0800</NameReact>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <NameReact>Category</NameReact>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <NameReact>Home</NameReact>
                            <Feather
                                name="chevron-right"
                                size={25}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 45 }}>
                        {
                            tags.map((item, index) => (
                                <ButtonTag
                                    key={index}
                                    activeOpacity={0.6}>
                                    <NameTag>{item}</NameTag>
                                </ButtonTag>
                            ))
                        }
                    </View>
                </Wrapper>
            </ImageHeaderScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    flexRow: {
        flexDirection: 'row',
    },
    image: {
        height: MAX_HEIGHT,
        width: windowWidth,
        alignItems: 'stretch',
        resizeMode: 'cover',
    },
    containerReact: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    section: {
        paddingVertical: 10,
        marginHorizontal: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#a1a1a1",
    },
    navTitle: {
        color: '#fff',
        backgroundColor: 'transparent'
    },
})
