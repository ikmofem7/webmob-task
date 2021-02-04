import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React from 'react';
import {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  const checkToken = async () => {
    Axios.defaults.headers.post['Content-Type'] = 'application/json';
    Axios.defaults.baseURL = 'http://68.183.48.101:3333/users/';
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken === null) {
      navigation.replace('LoginScreen');
    } else {
      navigation.replace('UserListScreen');
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return null;
};

export default SplashScreen;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExOTcsImlhdCI6MTYxMjQ1NTIwMH0.8y4ibJWdoAsmv-3bQf-Vgi5fdFjDtY6prntXONGanqk
