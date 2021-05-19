import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import InputForm from "../components/InputForm"
import ButtonForm from "../components/ButtonForm"
import SocialButton from "../components/SocialButton"

export default function SignUpScreen({ navigation }) {
    const [nameUser, setNameUser] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const _Regis = () => {
        fetch(`http://localhost:3000/api/user`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: nameUser,
                email: email,
                password: password,
            })
        })
            .then((response) => console.log(response.json()))
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>
            <InputForm
                labelValue={nameUser}
                onChangeText={(nameUser) => setNameUser(nameUser)}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderText="Name"
                iconType="person" />
            <InputForm
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                placeholderText="Email"
                iconType="local-post-office" />
            <InputForm
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                secureTextEntry={true}
                placeholderText="Password"
                iconType="lock" />
            <InputForm
                labelValue={confirmPassword}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                secureTextEntry={true}
                placeholderText="Confirm Password"
                iconType="lock" />
            <ButtonForm
                buttonTitle="Sign Up"
                onPress={() => _Regis()} />
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our</Text>
                <TouchableOpacity onPress={() => alert("Terms clicked!")}>
                    <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>Terms of service</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <TouchableOpacity onPress={() => alert("Privacy clicked!")}>
                    <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>Privacy policy</Text>
                </TouchableOpacity>
            </View>
            <SocialButton
                buttonTitle="Sign Up with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4" />
            <SocialButton
                buttonTitle="Sign Up with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea" />
            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => { navigation.navigate("Login") }} >
                <Text style={styles.navButtonText}>Have an account? Sign In</Text>
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
        fontWeight: "600",
        color: "#2e64e5",
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 14,
        fontWeight: '400',
        color: 'grey',
    }
})