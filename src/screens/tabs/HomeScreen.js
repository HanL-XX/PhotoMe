import React, { useContext, useDispatch, useSelector } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
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
import AnimatedBottomSheet from '../../components/AnimatedBottomSheet'
import { AuthContext } from '../../context/AuthContext'


const time = new Date().toISOString(); //get Date to post Status
const Posts = [
    {
        id: '1',
        userName: 'Minh',
        userImg: require('../../assets/images/user1.jpg'),
        postTime: '2021-05-04T03:16:34.820Z',
        postText: `Hi, I'm a developer`,
        postImg: require('../../assets/images/postImg/post1.jpg'),
        liked: true,
        likes: '2',
        comments: '5',
        saves: '5',
    },
    {
        id: '2',
        userName: 'Hà Nhật Linh',
        userImg: require('../../assets/images/user2.png'),
        postTime: time,
        postText: `Perfect Image for Bird!`,
        postImg: require('../../assets/images/postImg/post2.jpg'),
        liked: false,
        likes: '1',
        comments: '14',
        saves: '5',
    },
    {
        id: '3',
        userName: 'Group',
        userImg: require('../../assets/images/user3.jpg'),
        postTime: time,
        postText: `This is a first comment in group!!`,
        postImg: 'none',
        liked: false,
        likes: '48',
        comments: '2',
        saves: '5',
    },
]

//change HomeScreen in here!
const HomeStackScreen = ({ navigation }) => {
    const { name } = useContext(AuthContext) //get name from AuthContext
    //Modal Sheet code here!
    const modalizeRef = React.useRef(null);
    const onOpenBottomSheet = () => {
        modalizeRef.current?.open();
    }

    //Refresh Screen
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    })

    const handleNameUser = (dataUser) => {
        if (dataUser.userName !== name) {
            navigation.navigate('ProfileUserScreen', { dataUser: dataUser })
            // console.log(dataUser)
        }
        else {
            navigation.navigate('Profile')
            // alert(userName)
        }
    }
    return (
        <Container>
            <HeaderBar>
                <StatusBar>
                    <UserImgStatus
                        source={require("../../assets/images/user1.jpg")} />
                    <InputForm
                        placeholder="What's on your mind?"
                        onFocus={() => { navigation.push('PostMind') }}>
                    </InputForm>
                </StatusBar>
            </HeaderBar >
            <FlatList
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={Posts}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <PostCard
                        onOpenBottomSheet={onOpenBottomSheet}
                        modalizeRef={modalizeRef}
                        item={item}
                        onPress={() => { handleNameUser(item) }}
                    />}
            />

            {/* //show bottom sheet */}
            <AnimatedBottomSheet
                modalizeRef={modalizeRef} >

            </AnimatedBottomSheet>
        </Container >
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
            <HomeStackScreen navigation={navigation} />
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