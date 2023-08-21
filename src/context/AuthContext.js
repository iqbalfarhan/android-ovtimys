import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const login = (username, password) => {
    if (!username || !password) {
      Alert.alert('Auth message', 'Username atau password tidak boleh kosong');
    }

    axios
      .post('https://is.tr6.my.id/ovtimys/api/login', {
        username,
        password,
      })
      .then(function (response) {
        let token = response.data.token;

        setUserToken(token);
        AsyncStorage.setItem('userToken', token);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    setUserToken(userToken);
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{isLoading, userToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
