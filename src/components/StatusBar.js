import {StatusBar} from 'react-native';
import React from 'react';
import colors from '../colors';

export const WhiteSolidStatusBar = () => {
  return (
    <StatusBar
      animated={true}
      backgroundColor={colors.white}
      barStyle={'dark-content'}
    />
  );
};

export const PrimarySolidStatusBar = () => {
  return (
    <StatusBar
      animated={true}
      backgroundColor={colors.primary}
      barStyle={'light-content'}
    />
  );
};

export const TransparentStatusBar = () => {
  return (
    <StatusBar
      animated={true}
      backgroundColor={'transparent'}
      translucent
      barStyle={'light-content'}
    />
  );
};
