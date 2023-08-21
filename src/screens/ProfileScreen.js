import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import colors from '../colors';
import {AuthContext} from '../context/AuthContext';

function ProfileScreen({navigation}) {
  const {logout} = useContext(AuthContext);
  const [gambar, setGambar] = useState(
    'https://placeimg.com/192/192/people?random=12',
  );
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  async function getUser() {
    let userToken = await AsyncStorage.getItem('userToken');
    await axios
      .get('https://is.tr6.my.id/ovtimys/api/user', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      })
      .then(response => {
        setName(response.data.name);
        setUsername(response.data.username);
        setGambar(response.data.gambar);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.white}}>
      <View style={style.container}>
        <View style={style.profilePane}>
          <Image source={{uri: gambar}} style={style.profile} />
          <Text style={style.headerTitle}>{name}</Text>
          <Text style={style.headerSubTitle}>{username}@is.tr6.my.id</Text>
        </View>
        <TouchableOpacity
          style={style.submitButton}
          onPress={() => {
            logout();
          }}>
          <Text style={style.submitButtonText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{marginVertical: 50}}>
          <Text style={style.headerTitle}>Tentang aplikasi</Text>
          <Text style={style.headerSubTitle}>
            Tools Ovtimys Android Versi 1, digunakan untuk melakukan pencatatan
            pekerjaan lembur TKPK divisi IS Regional VI. Versi web bisa di akses
            pada halaman web IS Regional VI.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;

const style = StyleSheet.create({
  container: {
    padding: 50,
  },

  profilePane: {
    alignItems: 'center',
    marginVertical: 50,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: colors.primary,
    elevation: 20,
  },
  headerTitle: {
    fontSize: 28,
    color: colors.dark,
    fontFamily: 'Poppins-Bold',
  },
  headerSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'auto',
  },

  submitButton: {
    backgroundColor: colors.primary,
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
});
