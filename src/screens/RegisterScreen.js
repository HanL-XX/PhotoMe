import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import InputForm from "../components/InputForm"
import ButtonForm from "../components/ButtonForm"
import SocialButton from "../components/SocialButton"
import { AuthContext } from "../context/AuthContext"
import CheckBox from '@react-native-community/checkbox'
export default function SignUpScreen({ navigation }) {
    const [nameUser, setNameUser] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [sex, setSex] = useState();
    const [toggleMaleCheckBox, setToggleMaleCheckBox] = useState(false)
    const [toggleFemaleCheckBox, setToggleFemaleCheckBox] = useState(false)

    const { authContext: { register } } = React.useContext(AuthContext)
    const _Register = async () => {
        try {
            const user = {
                name: nameUser,
                email: email,
                password: password,
                sex: sex,
            }
            console.log(user)
            await register(JSON.stringify(user));
        } catch (error) {
            console.log(error)
        }
    }
    const handleMaleCheckBox = (value, sex) => {
        setToggleMaleCheckBox(value)
        setToggleFemaleCheckBox(!value)
        setSex(sex)
        console.log(sex)
    }
    const handleFemaleCheckBox = (value, sex) => {
        setToggleFemaleCheckBox(value)
        setToggleMaleCheckBox(!value)
        setSex(sex)
        console.log(sex)
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
                <View style={styles.checkBox}>
                    <CheckBox
                        value={toggleMaleCheckBox}
                        onValueChange={(newValue) => handleMaleCheckBox(newValue, 'male')} />
                    <Text style={{ marginLeft: 8 }}>Male</Text>
                </View>
                <View style={styles.checkBox}>
                    <CheckBox
                        value={toggleFemaleCheckBox}
                        onValueChange={(newValue) => handleFemaleCheckBox(newValue, 'female')} />
                    <Text style={{ marginLeft: 8 }}>Female</Text>
                </View>
            </View>
            <ButtonForm
                buttonTitle="Sign Up"
                onPress={() => _Register()} />
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
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
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
    },
    checkBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
    }
})