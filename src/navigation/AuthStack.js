import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import {PrimarySolidStatusBar} from '../components/StatusBar';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <PrimarySolidStatusBar />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
