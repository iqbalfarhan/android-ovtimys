import {View, Text, Button} from 'react-native';
import React from 'react';

const RegisterScreen = ({navigation}) => {
  return (
    <View>
      <Text>RegisterScreen</Text>
      <Button
        title="gotologin"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default RegisterScreen;
