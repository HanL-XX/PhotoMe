import axios from 'axios'
import { MAIN_URL } from '../config'
import AsyncStorage from '@react-native-community/async-storage'

export const fetchDataProfile = async (id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/profile`,
            params: { id_User: id }
        })
            .then(response => {
                resolve(response.data.profile)
            })
            .catch(err => {
                console.log(err)
                return err;
            })
    })
}

export const fetchMyAvatar = async () => {
    const id = await AsyncStorage.getItem('userId_Key')
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/profile`,
            params: { id_User: id }
        })
            .then(response => {
                resolve(response.data.profile.avatar)
            })
            .catch(err => {
                console.log(err)
                return err;
            })
    })
}

export const getAllPosts = async () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/newfeed/home`,
        })
            .then(response => {
                resolve(response.data.newfeed)
            })
            .catch(err => {
                return err;
            })
    })
}

export const checkUserReactPost = (id_User) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/profile`,
            params: {
                id_User: id_User //get id react this post
            }
        })
            .then(response => {
                resolve(response.data.profile)
            })
            .catch(err => {
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

export const getThisPost = async (idNewFeed) => {
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
                // console.log(err)
                return err;
            })
    })
}

export const createNewPost = async (data) => {
    const id_User = await AsyncStorage.getItem('userId_Key')
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `${MAIN_URL}/api/newfeed`,
            data: {
                id_User: id_User,
                status: data.status,
                image: data.image,
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => reject(err))
    })
}

export const deletePost = async (id_Newfeed) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `${MAIN_URL}/api/newfeed/deletenewfeed`,
            data: {
                id: id_Newfeed,
            },
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => reject(err))
    })
}

export const fetchComment = async (id_Newfeed) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/comment`,
            params: {
                id_Newfeed: id_Newfeed
            }
        })
            .then(response => {
                resolve(response.data.comment)
            })
            .catch(err => reject(err))
    })
}

export const fetchLiked = async (id_User, id_Newfeed) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${MAIN_URL}/api/liked`,
            params: {
                id_User: id_User,
                id_Newfeed: id_Newfeed,
            }
        })
            .then(response => {
                console.log(response.data.liked.liked)
                resolve(response.data.liked.liked)
            })
            .catch(err => reject(err))
    })
}

export const uploadComment = async (id_Newfeed, comment) => {
    const id_User = await AsyncStorage.getItem('userId_Key')
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `${MAIN_URL}/api/comment`,
            data: {
                id_User: id_User,
                id_Newfeed: id_Newfeed,
                comment: comment,
            }
        })
            .then(response => {
                resolve(response.data.cmt)
            })
            .catch(err => reject(err))
    })
}

export const deleteComment = async (id_Newfeed, id_Comment) => {
    const id_User = await AsyncStorage.getItem('userId_Key')
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `${MAIN_URL}/api/comment/deletecomment`,
            data: {
                id_User: id_User,
                id_Newfeed: id_Newfeed,
                id_Comment: id_Comment
            }
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => reject(err))
    })
}