import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCavvYuQiVZFaUlF9mtMVdkvQEfBPA-ZFI",
    authDomain: "siltron-app.firebaseapp.com",
    databaseURL: "https://siltron-app.firebaseio.com",
    projectId: "siltron-app",
    storageBucket: "siltron-app.appspot.com",
    messagingSenderId: "529584566629",
    appId: "1:529584566629:web:be78273d39ab25a98e718c",
    measurementId: "G-7MMJT1X2QW"
};


export const firebaseApp = firebase.initializeApp(firebaseConfig);

