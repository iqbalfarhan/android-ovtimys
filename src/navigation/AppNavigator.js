import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

import SplashScreen from '../screens/SplashScreen';

export default function AppNavigator() {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
