import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Header } from 'react-native-elements'
import PostCard from '../../components/PostCard'
import {
    Container,
    HeaderBar,
    StatusBar,
    UserImgStatus,
    InputForm,

} from '../../styles/FeedStyle'

const time = new Date().toISOString(); //get Date to post Status
const Posts = [
    {
        id: '1',
        name: 'Phạm Vũ Lê Minh',
        userName: 'phamvuleminh',
        userImg: require('../../assets/images/user1.jpg'),
        postTime: '2021-05-04T03:16:34.820Z',
        postText: `Hi, I'm a developer`,
        postImg: require('../../assets/images/postImg/post1.jpg'),
        liked: 'true',
        likes: '1',
        comments: '5',
        shares: '5',
    },
    {
        id: '2',
        name: 'Hà Nhật Linh',
        userName: 'hnlinh',
        userImg: require('../../assets/images/user2.png'),
        postTime: time,
        postText: `Perfect Image for Bird!`,
        postImg: require('../../assets/images/postImg/post2.jpg'),
        liked: 'true',
        likes: '1',
        comments: '14',
        shares: '5',
    },
    {
        id: '3',
        name: 'Group',
        userName: 'groupchat',
        userImg: require('../../assets/images/user3.jpg'),
        postTime: time,
        postText: `This is a first comment in group!!`,
        postImg: 'none',
        liked: 'false',
        likes: '48',
        comments: '2',
        shares: '5',
    },
]
//change HomeScreen in here!
const HomeStackScreen = () => {
    return (
        <Container>
            <HeaderBar>
                <StatusBar>
                    <UserImgStatus
                        source={require("../../assets/images/user1.jpg")} />
                    <InputForm
                        placeholder="What's on your mind?">
                    </InputForm>
                </StatusBar>
            </HeaderBar >
            <FlatList
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={Posts}
                renderItem={({ item }) => <PostCard item={item} />}
                keyExtractor={item => item.id} />
        </Container>
    )
}

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<Text style={styles.textContent}>PhotoMe</Text>}
                rightComponent={
                    <View style={styles.fontIcon}>
                        <TouchableOpacity>
                            <FontAwesome5
                                style={styles.icon}
                                name="plus"
                                size={25}
                                color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome5
                                style={styles.icon}
                                name="facebook-messenger"
                                size={25}
                                color="#000"
                                onPress={() => { navigation.navigate("Message") }} />
                        </TouchableOpacity>
                    </View>
                }
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                }}
            />
            <HomeStackScreen />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContent: {
        flex: 1,
        width: 130,
        fontSize: 25,
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "center",
    },
    fontIcon: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 10,
    }
})