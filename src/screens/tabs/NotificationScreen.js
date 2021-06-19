import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
    SafeAreaView, Container,
    UserInfo, UserImg,
    UserInfoWrapper, UserInfoText
} from '../../styles/NotificationStyle'
export default function NotificationScreen() {
    return (
        <SafeAreaView>
            <Container>
                <UserInfo>
                    <UserImg source={require('../../assets/images/postImg/post1.jpg')} />
                    <UserInfoWrapper>

                        <UserInfoText>
                            <Text style={{
                                fontSize: 17,
                                color: '#444',
                                fontWeight: '700'
                            }}>AAA </Text>
                            đã bình luận bài viết của bạn</UserInfoText>
                    </UserInfoWrapper>
                </UserInfo>
                <UserInfo>
                    <UserImg source={require('../../assets/images/postImg/post1.jpg')} />
                    <UserInfoWrapper>

                        <UserInfoText>
                            <Text style={{
                                fontSize: 17,
                                color: '#444',
                                fontWeight: '700'
                            }}>AAA </Text>
                            đã bình luận bài viết của bạn</UserInfoText>
                    </UserInfoWrapper>
                </UserInfo>
                <UserInfo>
                    <UserImg source={require('../../assets/images/postImg/post1.jpg')} />
                    <UserInfoWrapper>

                        <UserInfoText>
                            <Text style={{
                                fontSize: 17,
                                color: '#444',
                                fontWeight: '700'
                            }}>AAA </Text>
                            đã bình luận bài viết của bạn</UserInfoText>
                    </UserInfoWrapper>
                </UserInfo>
            </Container>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})