import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function CardComponent() {
  const [name, setName] = useState('');
  const [honor, setHonor] = useState(0);

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
        setHonor(response.data.honor);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View onPress={() => getUser()} style={style.cardWrapper}>
      <View style={style.card}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              fontFamily: 'Poppins-Bold',
              textTransform: 'uppercase',
            }}>
            {name}
          </Text>
          <Image
            source={require('../images/white.png')}
            style={{
              height: 23,
              width: 100,
              resizeMode: 'center',
            }}
          />
        </View>
        <View>
          <Text style={{color: colors.white, fontFamily: 'Poppins-Regular'}}>
            Penerimaan bulan ini
          </Text>
          <TouchableOpacity onPress={() => getUser()}>
            <Text
              style={{
                color: colors.white,
                fontFamily: 'Poppins-Bold',
                fontSize: 20,
              }}>
              Rp. {honor}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    width: '100%',
    height: 220,
    padding: 30,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    elevation: 10,
  },
});
