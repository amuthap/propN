import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert,TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import '@firebase/firestore';

import firebase from 'firebase';

export const firebaseConfig = {
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

class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
  
  signInWithGoogleAsync = async () => {
      
    try {
     
      const { type, user, idToken, accessToken } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId:
          '7390337362-uhvtlgllqqcclretcqptskicccan5r55.apps.googleusercontent.com',
        iosClientId:
          '',
        scopes: ['profile', 'email'],
      });
 
      switch (type) {
        case 'success': {
          Alert.alert('Logged in!', ` ${user.name}!`);
          console.log(user);
          console.log(type);
          console.log(idToken);
          console.log(accessToken);

          const credential = new firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          firebase
            .auth()
            .signInWithCredential(credential)
            .catch(error => {
              // Handle Errors here.
              console.log('Error authenticating with Google');
              console.log(error);
              console.log(error.message);
            });

          break;
        }
        case 'cancel': {
          Alert.alert('Cancelled!', 'Login was cancelled!');
          break;
        }
        default: {
          Alert.alert('Oops!', 'Login failed!');
        }
      }
    } catch (e) {
      Alert.alert('Oops!', 'Login failed!');
    }
  };
  
  state = {
    responseJSON: null,
  };
  handleLogout() {
    firebase.auth().signOut()
  }
  callGraph = async token => {
    /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    const responseJSON = JSON.stringify(await response.json());
    this.setState({ responseJSON });
  };

  login = async () => {
   

    try {
      await Facebook.initializeAsync('3440035739424761');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile',],
      });
      if (type === 'success') {
        
        this.callGraph(token);
        this.firebaseLogin(token);
        
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

  };

  // Sign in with credential from the Facebook user.
  firebaseLogin = token => {
    console.log('Test log!!!')
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    firebase.auth().signInWithCredential(credential).catch((error) => {
    //     // Handle Errors here.
     console.warn("Add Error for login", error)
      });
  };


  renderButton = () => (
    <TouchableOpacity onPress={() => this.login()}>
      <View
        style={{
          
          alignSelf: 'center',
          borderRadius: 2,
          padding: 14,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Login to Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );
  renderValue = value => (
    <Text> </Text> /*key={value} style={styles.paragraph}>{value}*/
  );
  
  render() {
     const {navigate} = this.props.navigation;
    return (
       <View style={styles.container}>
        <Button title="Login with Google" onPress={this. signInWithGoogleAsync} />
        {this.state.responseJSON &&
          this.renderValue('User data : ' + this.state.responseJSON)}

        {this.renderButton()}
        
      
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});