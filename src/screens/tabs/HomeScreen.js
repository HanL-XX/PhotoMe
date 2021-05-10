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

} from '../../styles/HomeStyle'
const Posts = [
    {
        id: '1',
        userName: 'Phạm Vũ Lê Minh',
        userImg: require('../../assets/images/user1.jpg'),
        postTime: '4 mins ago',
        postText: `Hi, I'm a developer`,
        postImg: require('../../assets/images/postImg/post1.jpg'),
        likes: '1',
        comments: '5',
    },
    {
        id: '2',
        userName: 'Hà Nhật Linh',
        userImg: require('../../assets/images/user2.png'),
        postTime: '1 hours ago',
        postText: `Perfect Image for Bird!`,
        postImg: require('../../assets/images/postImg/post2.jpg'),
        likes: '0',
        comments: '14',
    },
    {
        id: '3',
        userName: 'Group',
        userImg: require('../../assets/images/user3.jpg'),
        postTime: 'Active',
        postText: `This is a first comment in group!!`,
        postImg: 'none',
        likes: '48',
        comments: '2',
    },
]

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