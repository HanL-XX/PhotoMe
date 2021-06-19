import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ImagePicker from "react-native-image-crop-picker" ///npm install react-native-image-crop-picker hoặc react-native-image-picker 
import { firebaseApp } from './firebaseconfig'/// npm install firebase ở firebase config
import RNFetchBlob from 'react-native-fetch-blob'/// npm install
import { InteractionManager } from 'react-native';

////fix time out//////
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
////////////////////////////upload pic/////////////////////////////////////////////////////
const storage = firebaseApp.storage()
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const uploadPic = (uri, mine) => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        console.log('UploadUri::', uploadUri)
        const sessionId = new Date().getTime()
        let uploadBlob = null;
        // const imageRef=storage.ref('images').child(`${sessionId}.${"(.*?)".exec(mine)}`)
        const imageRef = storage.ref('images').child(`${sessionId}.jpg`)

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                console.log('UploadUri::', uploadUri)
                return Blob.build(data, { type: `${mine};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                console.log('UploadUri2::', uploadUri)
                return imageRef.put(blob, { contenType: mine })
            })
            .then(() => {
                uploadBlob.close()
                console.log('UploadUri3::', imageRef.getDownloadURL())
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                console.log('url4::', url)
                resolve(url)
            })
            .catch((err) => {
                reject(err)
            })
    })

}
export const deletePic = (uri) => {
    // let storageref=storage.ref(uri)
    if (uri) {
        let pictureRef = firebaseApp.storage().refFromURL(uri);
        pictureRef.delete()
            .then(() => {
                alert("Picture is deleted successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
// export default class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             avatarSource: null, // chứa uri ảnh trong thiết bị
//             pic: null, // chưa thông tin image trong thiết bị
//             uri: null // chưa uri khi đả upload thành công 
//         }
//     }

//     library = () => {
//         //alert('clicked');
//         // ImagePicker.launchImageLibrary(options, (response) => {
//         //   console.log('Response = ', response);

//         //   if (response.didCancel) {
//         //     console.log('User cancelled image picker');
//         //   }
//         //   else if (response.error) {
//         //     console.log('Image Picker Error: ', response.error);
//         //   }

//         //   else {
//         //     let source = { uri: response.uri };

//         //     // You can also display the image using data:
//         //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };

//         //     this.setState({
//         //       avatarSource: source,
//         //       pic:response.data
//         //     });
//         //   }
//         // });
//         ImagePicker.openPicker({
//             width: 300,
//             height: 300,
//             cropping: true,
//         }).then(async image => {
//             console.log(image);
//             let a = await uploadPic(image.path, image.mime)
//             console.log('ủi::', a)
//             this.setState({
//                 avatarSource: image.path,
//                 pic: image,
//                 uri: a,
//             })
//         }).catch(e => { // Fix err user cancel
//             if (e.code !== 'E_PICKER_CANCELLED') {
//                 console.log(e);
//                 Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
//             }
//         })
//     }
//     takecam = () => {
//         //alert('clicked');
//         ImagePicker.openCamera({
//             compressImageMaxWidth: 300,
//             compressImageMaxHeight: 300,
//             cropping: true,
//             compressImageQuality: 0.7
//         }).then(async image => {
//             console.log(image);
//             let a = await uploadPic(image.path, image.mime)
//             console.log('ủi::', a)
//             this.setState({
//                 avatarSource: image.path,
//                 pic: image,
//                 uri: a
//             });
//         }).catch(e => {// Fix err user cancel
//             if (e.code !== 'E_PICKER_CANCELLED') {
//                 console.log(e);
//                 Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
//             }
//         })
//     }
//     delete = async (uri) => {
//         await deletePic(this.state.uri)
//         this.setState({
//             uri: null
//         });
//     }
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.welcome}>Welcome to React Native!</Text>
//                 <Image source={{ uri: this.state.uri }}
//                     style={{ width: '100%', height: 300, margin: 10 }} />
//                 <TouchableOpacity style={{ backgroundColor: 'green', margin: 10, padding: 10 }}
//                     onPress={this.takecam}>
//                     <Text style={{ color: '#fff' }}>Use Photo</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ backgroundColor: 'green', margin: 10, padding: 10 }}
//                     onPress={this.library}>
//                     <Text style={{ color: '#fff' }}>Choice library</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => { this.delete(this.state.uri) }}>
//                     <Text>DeletePic</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });