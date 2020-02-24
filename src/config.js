import Firebase from 'firebase';
import 'firebase/firestore';

let config = {
 apiKey: "AIzaSyDqc-8Awu0tj8fuXygse5gdmZgtJtrq6ZI",
    authDomain: "nproperty-fa35e.firebaseapp.com",
    databaseURL: "https://nproperty-fa35e.firebaseio.com",
    projectId: "nproperty-fa35e",
    storageBucket: "nproperty-fa35e.appspot.com",
    messagingSenderId: "891613720820",
    appId: "1:891613720820:web:24dbcf4480e75bc4602ea1",
    measurementId: "G-7DMLMSEW7Y"
};

let app = Firebase.initializeApp(config);
export const db = app.firestore();