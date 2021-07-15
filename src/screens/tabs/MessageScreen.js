import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Header } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
    Container,
    Card,
    UserName,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserActive,
    UserInfoText,
    PostTime,
    MessageText,
    TextSection

} from '../../styles/MessageStyles'

const Stack = createStackNavigator()
const Messages = [
    {
        id: '1',
        userName: "Phạm Vũ Lê Minh",
        userImg: require('../../assets/images/user1.jpg'),
        messageTime: 'Active',
        messageText: "CCCCCCCCCC"
    },
    {
        id: '2',
        userName: "Hà Nhật Linh",
        userImg: require('../../assets/images/user2.png'),
        messageTime: 'Active',
        messageText: "Đồ án 1"
    },
    {
        id: '3',
        userName: "CNPM",
        userImg: require('../../assets/images/user3.jpg'),
        messageTime: 'Active',
        messageText: "Mềm chuyên sâu @@"
    },

]

//change MessageScreen in here
const MessageStackScreen = ({ navigation }) => {
    //Refresh Screen
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    })
    return (
        <Container>
            <FlatList
                data={Messages}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => (
                    <Card onPress={() => {
                        navigation.navigate("Chat", {
                            userName: item.userName,
                            userImg: item.userImg,
                            messageTime: item.messageTime,
                        })
                    }}>
                        <UserInfo >
                            <UserImgWrapper>
                                <UserImg source={item.userImg} />
                                <UserActive></UserActive>
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.userName}</UserName>
                                    <PostTime>{item.messageTime}</PostTime>
                                </UserInfoText>
                                <MessageText>{item.messageText}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )} />
        </Container>
    )
}

export default function MessageScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Header
                containerStyle={{
                    paddingHorizontal: 10,
                    backgroundColor: '#fff',
                    textAlign: 'left'
                }}
                leftComponent={
                    <View style={styles.fontIcon}>
                        <TouchableOpacity>
                            <FontAwesome
                                name="angle-left"
                                size={24}
                                backgroundColor="#fff"
                                color="#333"
                                onPress={() => navigation.goBack()} />
                        </TouchableOpacity>

                    </View>
                }
                rightComponent={
                    <View style={styles.fontIcon}>
                        <TouchableOpacity>
                            <FontAwesome
                                style={styles.icon}
                                name="edit"
                                size={24}
                                color="#000"
                                onPress={() => { navigation.navigate("Message") }} />
                        </TouchableOpacity>
                    </View>
                }
                centerComponent={
                    <View style={{ marginRight: 50, }}>
                        <Text style={{ fontSize: 20 }}>Username here!</Text>
                    </View>
                }
            />
            <MessageStackScreen navigation={navigation} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    fontIcon: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 11,
    },
})