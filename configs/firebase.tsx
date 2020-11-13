import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBzcQqF5v28Pt_mhghG2evKhZaJWRPot9Y",
    authDomain: "management-and-education.firebaseapp.com",
    databaseURL: "https://management-and-education.firebaseio.com",
    projectId: "management-and-education",
    storageBucket: "management-and-education.appspot.com",
    messagingSenderId: "562130013185",
    appId: "1:562130013185:web:c6b58d2eecf71f67310400",
    measurementId: "G-GC00EHHP3Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const database = firebase.firestore();