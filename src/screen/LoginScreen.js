import Axios from 'axios';
import {Formik} from 'formik';
import React from 'react';
import {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as yup from 'yup';
import Colors from '../Colors';
import InputField from '../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';

const LoginScreen = ({navigation}) => {
  const yupValidation = yup.object().shape({
    userName: yup
      .string()
      .required('Full name  is required')
      .min(3, 'Enter minimum of 3 or more characters'),
    email: yup
      .string()
      .required('Email is required')
      .email('Enter valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Enter minimum of 8 or more characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  useEffect(() => {
    Axios.defaults.headers.post['Content-Type'] = 'application/json';
    Axios.defaults.baseURL = 'http://68.183.48.101:3333/users/';
  }, []);
  const onLogin = async (values) => {
    console.log(values);
    const requestData = {
      username: values.userName,
      email: values.email,
      password: values.password,
    };
    try {
      const response = await Axios.post(
        'register',
        JSON.stringify(requestData),
      );
      console.log(response.data);
      const data = response.data.data;
      const token = await AsyncStorage.setItem('token', data.token.token);
      console.log(data.token.token);
      navigation.replace('UserListScreen');
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Request failed with status code 422') {
        alert('unique validation failed on username');
      } else {
        alert(error.message);
      }
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{height: Dimensions.get('window').height}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: Colors.primary,
        }}>
        <Card>
          <Formik
            enableReinitialize={true}
            initialValues={{
              userName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={yupValidation}
            onSubmit={(values) => onLogin(values)}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <View style={{padding: 20}}>
                <InputField
                  label="Full Name"
                  onChange={handleChange('userName')}
                  onBlur={() => setFieldTouched('userName')}
                  value={values.userName}
                  touched={touched.userName}
                  error={errors.userName}
                />
                <InputField
                  label="Email"
                  onChange={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  value={values.email}
                  touched={touched.email}
                  error={errors.email}
                />
                <InputField
                  label="Password"
                  onChange={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  value={values.password}
                  touched={touched.password}
                  error={errors.password}
                />
                <InputField
                  label="Confirm Password"
                  onChange={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  value={values.confirmPassword}
                  touched={touched.confirmPassword}
                  error={errors.confirmPassword}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.primary,
                    padding: 20,
                    borderRadius: 30,
                    marginTop: 10,
                  }}
                  onPress={() => handleSubmit()}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
export default LoginScreen;
