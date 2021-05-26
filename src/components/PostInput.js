import React, { useState } from "react"
import { View, Text, StyleSheet, Switch } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { windowWidth, windowHeight } from "../utils/Dimensions"

export default function PostInput({ iconType, namePost, check, checkDescript, textDescript, ...rest }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (

        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                {
                    (check) ? (
                        <FontAwesome
                            name={iconType}
                            size={24}
                            color="#666" />
                    ) :
                        (<Ionicons
                            name={iconType}
                            size={24}
                            color="#666" />)
                }

            </View>

            <View style={styles.input}>
                <Text
                    style={{ fontSize: 17 }}
                    numberOfLines={1}
                    {...rest}>{namePost}
                </Text>
                {
                    (checkDescript) ? (
                        <Text
                            // numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                fontSize: 14, color: '#949494', width: '75%'
                            }}
                            {...rest} >
                            {textDescript}
                        </Text>
                    ) : (<></>)
                }
            </View>
            {
                (checkDescript) ? (
                    <View style={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', }} >
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isEnabled} />
                    </View>

                ) : (<></>)
            }

        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 5,
        width: "100%",
        height: windowHeight / 10,
        borderColor: "#e7e7e7",
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    iconStyle: {
        padding: 10,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: "#ccc",
        // borderRightWidth: 1,
        width: 50,
    },
    input: {
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
        color: "#333",
        justifyContent: "center",
    },
})
