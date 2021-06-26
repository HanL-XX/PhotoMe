import RNFetchBlob from 'react-native-fetch-blob';
import { firebaseApp } from './firebaseconfig';
import TimeOutFirebase from './TimeOutFirebase'
////fix time out//////
TimeOutFirebase()
////////////////////////////upload pic/////////////////////////////////////////////////////
const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = RNFetchBlob.polyfill.Fetch

window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto: true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes: [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()

export const uploadPic = (uri, mine) => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        console.log('UploadUri::', uploadUri);
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        // const imageRef=storage.ref('images').child(`${sessionId}.${"(.*?)".exec(mine)}`)
        const imageRef = storage.ref('images').child(`${sessionId}.jpg`);

        fs.readFile(uploadUri, 'base64')
            .then(data => {
                console.log('UploadUri::', uploadUri);
                return Blob.build(data, { type: `${mine};BASE64` });
            })
            .then(blob => {
                uploadBlob = blob;
                console.log('UploadUri2::', uploadUri);
                return imageRef.put(blob, { contentType: mine });
            })
            .then(() => {
                uploadBlob.close();
                console.log('UploadUri3::', imageRef.getDownloadURL());
                return imageRef.getDownloadURL();
            })
            .then(url => {
                console.log('url4::', url);
                resolve(url);
            })
            .catch(err => {
                reject(err);
            });
    });
};
export const deletePic = uri => {
    // let storageref=storage.ref(uri)
    if (uri) {
        let pictureRef = firebaseApp.storage().refFromURL(uri);
        pictureRef
            .delete()
            .then(() => {
                alert('Picture is deleted successfully!');
            })
            .catch(err => {
                console.log(err);
            });
    }
};