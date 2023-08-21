import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabScreen from '../screens/TabScreen';
import DetailLemburScreen from '../screens/DetailLemburScreen';
import LemburScreen from '../screens/LemburScreen';
import TambahSppdScreen from '../screens/TambahSppdScreen';
import TambahLemburanScreen from '../screens/TambahLemburanScreen';
import {WhiteSolidStatusBar} from '../components/StatusBar';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <>
      <WhiteSolidStatusBar />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={TabScreen} />
        <Stack.Screen name="Lembur" component={LemburScreen} />
        <Stack.Screen name="TambahLemburan" component={TambahLemburanScreen} />
        <Stack.Screen name="TambahSppd" component={TambahSppdScreen} />
        <Stack.Screen name="DetailLembur" component={DetailLemburScreen} />
      </Stack.Navigator>
    </>
  );
}

export default AppStack;
