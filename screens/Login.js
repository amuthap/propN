import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'

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
  
})

class Signup extends Component {
  state = {
    passwordVisibility: false,
   
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
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state
    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled
        behavior='padding'

      >
        <ScrollView>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
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
                    placeholder='Enter your full name'
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
                    secureTextEntry={passwordVisibility}
                    rightIcon={
                      <TouchableOpacity onPress={this.handlePasswordVisibility}>
                        <Ionicons name={passwordIcon} size={28} color='grey' />
                      </TouchableOpacity>
                    }
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
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff'
  }
})

export default withFirebaseHOC(Signup)