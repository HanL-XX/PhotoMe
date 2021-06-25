import axios from 'axios'
import { MAIN_URL } from '../config'
import AsyncStorage from '@react-native-community/async-storage'

export const fetchDataProfile = async () => {
    const id = await AsyncStorage.getItem('userId_Key');

    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/profile`,
            params: { id_User: id }
        })
            .then(response => {
                // console.log(response.data.profile)
                resolve(response.data.profile)
            })
            .catch(err => {
                console.log(err)
                return err;
            })
    })
}

export const UpdateLikePost = async (idUser, idNewFeed) => {
    idUser = await AsyncStorage.getItem('userId_Key')
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `${MAIN_URL}/api/liked/updateliked`,
            data: {
                id_User: idUser,
                id_Newfeed: idNewFeed,
            }
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                console.log(err)
                return err;
            })
    })
}

export const getAllMindPost = async (id_User) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/newfeed`,
            params: {
                id_User: id_User
            },
        })
            .then((response) => {
                resolve(response.data.newfeed)
            })
    })
}

export const getPost = async (idNewFeed) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/newfeed/thispost`,
            params: {
                id_Newfeed: idNewFeed,
            }
        })
            .then(response => {
                // console.log(response.data)
                resolve(response.data.newfeed)
            })
            .catch(err => {
                // console.log(err)
                return err;
            })
    })
}

export const getLiked = async (id_User, id_Newfeed) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/liked`,
            params: {
                id_User: id_User,
                id_Newfeed: id_Newfeed
            }
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                // console.log(err)
                return err;
            })
    })
}