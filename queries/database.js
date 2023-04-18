
const admin = require('firebase-admin');
const serviceAccount = require("../todos-f0c01-firebase-adminsdk-3mdxk-1fabac3cfa.json");
const firebase = require('firebase/compat/app')

require('firebase/auth')
require('firebase/compat/firestore')
const firebaseConfig = {
    apiKey: "AIzaSyBw1-9k9CZLd1GbYV_sABVxSBTBRQcWXuM",
    authDomain: "todos-f0c01.firebaseapp.com",
    projectId: "todos-f0c01",
    storageBucket: "todos-f0c01.appspot.com",
    messagingSenderId: "1090937200416",
    appId: "1:1090937200416:web:c823726746a08992660145"
};

//initialize admin SDK using serviceAcountKey
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()

module.exports = { admin, firebase, db }