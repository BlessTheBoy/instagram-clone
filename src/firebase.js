import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBtqcUtAS2E39k1H1N1OSmJTJRX11zG0GQ",
    authDomain: "instagram-clone-react-8efee.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-8efee.firebaseio.com",
    projectId: "instagram-clone-react-8efee",
    storageBucket: "instagram-clone-react-8efee.appspot.com",
    messagingSenderId: "975285786294",
    appId: "1:975285786294:web:89e45ffce9f430b48e7817",
    measurementId: "G-EF3DB1L86E"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export  {db, auth, storage}