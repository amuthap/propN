import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase


const firebaseConfig = {
  apiKey: "AIzaSyDu0L0Pe2hCtdeoORRxo7R0DMm6QZbnsOQ",
      authDomain: "webapp-260208.firebaseapp.com",
      databaseURL: "https://webapp-260208.firebaseio.com",
      projectId: "webapp-260208",
      storageBucket: "webapp-260208.appspot.com",
      messagingSenderId: "7390337362",
    };
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
          }
      
const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },
  passwordReset: email => {
    return firebase.auth().sendPasswordResetEmail(email)
  },
  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  }
}

export default Firebase

        



