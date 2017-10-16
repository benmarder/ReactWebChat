import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDBmZ2axyP_8xFV_7IJAJSFiEvu-qp7qnc",
    authDomain: "lets-chat-43e37.firebaseapp.com",
    databaseURL: "https://lets-chat-43e37.firebaseio.com",
    projectId: "lets-chat-43e37",
    storageBucket: "",
    messagingSenderId: "1089663295603"
  };

firebase.initializeApp(config);
const database = firebase.database();

export default database;
