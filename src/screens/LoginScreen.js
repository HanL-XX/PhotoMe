import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import InputForm from "../components/InputForm"
import ButtonForm from "../components/ButtonForm"
import SocialButton from "../components/SocialButton"

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/images/Logoden.png")} />
            <Text style={styles.text}>PhotoMe App</Text>
            <InputForm
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                placeholderText="Email"
                iconType="user" />
            <InputForm
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                secureTextEntry={true}
                placeholderText="Password"
                iconType="lock" />
            <ButtonForm
                buttonTitle="Sign In"
                onPress={() => navigation.navigate("MainScreen")} />
            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => { }} >
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
            <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4" />
            <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea" />
            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Register')} >
                <Text style={styles.navButtonText}>Don"t have an account? Create here</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: "cover",
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: "#051d5f",
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#2e64e5",
    },
})