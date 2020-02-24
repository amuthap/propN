import * as React from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import Signup from '../screens/Signup';
import Login from '../screens/Login';



export default class HomeScreen extends React.Component {
  render () {
    return <AppContainer />
   
  }
  
}
  
  
  const AppNavigator = createStackNavigator({
    
     LoadingScreen: LoadingScreen,
    LoginScreen: LoginScreen,
    DashboardScreen: DashboardScreen,
     Signup : Signup,
     Login: Login

  })
  
  
  const AppContainer = createAppContainer(AppNavigator);
  
  
  


