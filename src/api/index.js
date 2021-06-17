import axios from 'axios'
import { MAIN_URL } from '../config'
import AsyncStorage from '@react-native-community/async-storage'

export const fetchProfile = async () => {
    const id = await AsyncStorage.getItem('userId_Key');

    axios.get(`${MAIN_URL}/api/profile`, { params: { id_User: id } })
}