// Rename this file to "firebaeConfig.js" before use
// Replace all Xs with real Firebase API keys

export default {
  
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