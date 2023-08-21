import React from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import colors from '../colors';
import {PrimarySolidStatusBar} from '../components/StatusBar';

export default function SplashScreen() {
  return (
    <>
      <PrimarySolidStatusBar />
      <View style={style.container}>
        <Image source={require('../images/white.png')} style={style.image} />
        <Text style={style.text}>Over time management system</Text>
        <ActivityIndicator color={colors.light} />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
});
