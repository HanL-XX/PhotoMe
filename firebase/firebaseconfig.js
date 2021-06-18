import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCqEs5pxk51DX8kDuSonpaH-tprAGmk1aA",
    authDomain: "photome-test1.firebaseapp.com",
    databaseURL: "https://photome-test1-default-rtdb.firebaseio.com",
    projectId: "photome-test1",
    storageBucket: "photome-test1.appspot.com",
    messagingSenderId: "1088870319302",
    appId: "1:1088870319302:web:8392bb55d31193049483c7",
    measurementId: "G-YPXW48PS1M"
  };
  // Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
