import React, {useState, useContext} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../colors';
import {TransparentStatusBar} from '../../components/StatusBar';

import {AuthContext} from '../../context/AuthContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);

  return (
    <>
      <TransparentStatusBar />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={style.container}>
          <View style={style.content}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../images/white.png')}
                style={style.image}
              />
              <Text style={style.headerText}>
                IS Overtime management System
              </Text>
            </View>

            <View style={{marginVertical: 50}}>
              <View style={style.formGroup}>
                <View style={style.formIcon}>
                  <Icon name="user" size={20} />
                </View>
                <TextInput
                  style={style.formControl}
                  value={username}
                  placeholder="Username"
                  onChangeText={text => {
                    setUsername(text);
                  }}
                />
              </View>

              <View style={style.formGroup}>
                <View style={style.formIcon}>
                  <Icon name="key" size={20} />
                </View>
                <TextInput
                  style={style.formControl}
                  value={password}
                  placeholder="Password"
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  secureTextEntry
                />
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={style.submitButton}
                onPress={() => {
                  login(username, password);
                }}>
                <Text style={style.submitButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 50,
    flex: 1,
    justifyContent: 'center',
  },
  content: {},
  image: {
    resizeMode: 'center',
    width: '100%',
    height: 70,
    justifyContent: 'center',
  },
  headerText: {
    color: colors.white,
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
  },
  submitButton: {
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },

  submitButtonText: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },

  formGroup: {
    marginVertical: 5,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
  },
  formIcon: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingHorizontal: 0,
  },
});
