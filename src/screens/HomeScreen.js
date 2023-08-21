import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';
import LemburItemComponent from '../components/LemburItemComponent';
import CardComponent from '../components/CardComponent';

export default function HomeScreen({navigation}) {
  const [name, setName] = useState('User name');
  const [refreshing, setRefreshing] = React.useState(false);
  const [gambar, setGambar] = useState(
    'https://placeimg.com/192/192/people?random=12',
  );
  const [user, setUser] = useState(null);
  const [lemburs, setLemburs] = useState(null);
  const [liburs, setLiburs] = useState(null);

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
        setUser(response.data);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  async function getLemburs() {
    let userToken = await AsyncStorage.getItem('userToken');
    await axios
      .get('https://is.tr6.my.id/ovtimys/api/lembur', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      })
      .then(response => {
        setLemburs(response.data);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  async function getLiburs() {
    let userToken = await AsyncStorage.getItem('userToken');
    await axios
      .get('https://is.tr6.my.id/ovtimys/api/libur', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      })
      .then(response => {
        setLiburs(response.data);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  useEffect(() => {
    getUser();
    getLemburs();
    getLiburs();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getLemburs();
    getLiburs();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: colors.white}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <HeaderComponent
        props={{
          title: (user ? user.name : name) + ' 👋',
          subTitle: 'Selamat datang',
          gambar: user ? user.gambar : gambar,
        }}
      />

      <CardComponent />

      <View style={style.section}>
        <View style={style.sectionHeader}>
          <Text style={style.sectionTitle}>Lemburan bulan ini</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Lembur');
            }}>
            <Text style={style.sectionLink}>Lihat semua</Text>
          </TouchableOpacity>
        </View>
        <View style={(style.sectionBody, {paddingHorizontal: 20})}>
          {lemburs != null ? (
            lemburs.map((item, index) => {
              return (
                <View key={index}>
                  <LemburItemComponent props={item} />
                </View>
              );
            })
          ) : (
            <ActivityIndicator color={colors.primary} />
          )}
        </View>
      </View>

      <View style={style.section}>
        <View style={style.sectionHeader}>
          <Text style={style.sectionTitle}>Tanggal merah bulan ini</Text>
        </View>
        <View style={style.sectionBody}>
          <FlatList
            horizontal
            data={liburs}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: colors.blueLight,
                    marginLeft: index === 0 ? 20 : 10,
                    padding: 20,
                    borderRadius: 20,
                    elevation: 1,
                    marginBottom: 5,
                  }}>
                  <Text style={{fontFamily: 'Poppins-Regular'}}>
                    {item.tanggal}
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 18}}>
                    {item.keterangan}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.dark,
  },
  sectionBody: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionLink: {
    color: colors.gray,
    fontFamily: 'Poppins-Regular',
  },

  statusItem: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: colors.blueLight,
    elevation: 1,
  },
  statusItemTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
});
