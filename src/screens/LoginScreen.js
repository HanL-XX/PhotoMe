import React, { useState, useEffect } from "react"
import { View, SafeAreaView, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import InputForm from "../components/InputForm"
import ButtonForm from "../components/ButtonForm"
import SocialButton from "../components/SocialButton"
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import getIdUser from '../components/getIdUser'

export default function LoginScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const data = JSON.stringify(user)

    const userToken = null
    const userName = null
    const userId = null
    //SignIn
    const { authContext: { signIn } } = React.useContext(AuthContext)

    const _Login = async () => {
        try {
            await signIn(data, userToken, userName, userId)
            setIsLoading(true)
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Image
                    style={styles.logo}
                    source={require("../assets/images/Logoden.png")} />
                <Text style={styles.text}>PhotoMe App</Text>
                <InputForm
                    labelValue={user.email}
                    onChangeText={(userEmail) => setUser({ ...user, email: userEmail })}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    placeholderText="Email"
                    iconType="person" />
                <InputForm
                    labelValue={user.password}
                    onChangeText={(userPassword) => setUser({ ...user, password: userPassword })}
                    secureTextEntry={true}
                    placeholderText="Password"
                    iconType="lock" />
                <ButtonForm
                    buttonTitle="Sign In"
                    onPress={() => _Login()} />
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => { }} >
                    <Text style={styles.navButtonText}>Forgot Password?</Text>
                </TouchableOpacity>
                {/* <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4" />
            <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea" /> */}
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => navigation.navigate('Register')} >
                    <Text style={styles.navButtonText}>Don't have an account? Create here</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
    },
    wrapper: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
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