import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'
import firebase from 'firebase';
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('City')
    .required()
    .min(6, 'City should be at least 6 characters '),
  //confirmPassword: Yup.string()
  //  .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    //.required('Confirm Password is required'),
  //check: Yup.boolean().oneOf([true], 'Please check the agreement')
})

class DashboardScreen extends Component {
  
  state = {
    passwordVisibility: true,
    rightIcon: 'ios-eye'
  }

 
  handleOnSignup = async (values, actions) => {
    const { name, email, password } = values

    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      )

      if (response.user.uid) {
        const { uid } = response.user
        const userData = { email, name, uid }
        await this.props.firebase.createNewUser(userData)
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
   
    return (
      <ScrollView>
      <View style={styles.container}>
     
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
        <Text></Text>
        
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              //confirmPassword: '',
              check: false
            }}
            onSubmit={(values, actions) => {
              this.handleOnSignup(values, actions)
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
              setFieldValue
            }) => (
                <Fragment>
                  <FormInput
                    name='name'
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder='Enter your name'
                    iconName='md-person'
                    iconColor='#2C384A'
                    onBlur={handleBlur('name')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                  <FormInput
                    name='email'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    iconName='ios-mail'
                    iconColor='#2C384A'
                    onBlur={handleBlur('email')}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />
                  <FormInput
                    name='password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder='Enter City'
                    
                    onBlur={handleBlur('password')}
                    
                    
                  />
                  <ErrorMessage errorValue={touched.password && errors.password} />
                 
                    <View style={styles.buttonContainer}>
                    <FormButton
                      buttonType='outline'
                      onPress={handleSubmit}
                      title='Submit'
                      buttonColor='#F57C00'
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                    />
                  </View>
                  <ErrorMessage errorValue={errors.general} />

                </Fragment>
              )}
          </Formik>
          <Button
           // title='Have an account? Login'
            onPress={this.goToLogin}
            titleStyle={{
              color: '#039BE5'
            }}
            type='clear'
          />
          </View>
        </ScrollView>
         
        
      
    );
  }
}
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
  width: '30%',
          borderRadius: 4,
          position: 'absolute',
          top: 10,
          right: 10,
          padding: 14,
      
  },
  container: {
    paddingTop: 10
 },
 input: {
    margin: 15,
    height: 10,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
 submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 10,
 },
 submitButtonText:{
    color: 'white'
 }
});