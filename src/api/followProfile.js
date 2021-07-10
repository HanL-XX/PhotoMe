import axios from 'axios'
import { MAIN_URL } from '../config'
import AsyncStorage from '@react-native-community/async-storage'


export const fetchFollow = async () => {
    const id_User = await AsyncStorage.getItem('userId_Key')
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/follow`,
            params: {
                id_User: id_User,
            },
        })
            .then(response => {
                // console.log(response.data.follow)
                resolve(response.data.follow.id_following)
            })
            .catch(err => {
                return;
            })
    })
}

export const activeFollow = async (id_Follower) => {
    const id_User = await AsyncStorage.getItem('userId_Key')
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `${MAIN_URL}/api/profile/updatefollow/follow`,
            data: {
                id_User: id_User,
                id_Follower: id_Follower
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response)
                // resolve(response.data.profile)
            })
            .catch(err => {
                return;
            })
    })
}

export const activeUnfollow = async (id_Follower) => {
    const id_User = await AsyncStorage.getItem('userId_Key')
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `${MAIN_URL}/api/profile/updatefollow/unfollow`,
            data: {
                id_User: id_User,
                id_Follower: id_Follower
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response)
                // resolve(response.data.profile)
            })
            .catch(err => {
                return;
            })
    })
}