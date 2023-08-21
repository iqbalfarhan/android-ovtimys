import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import colors from '../colors';
import HeaderComponent from '../components/HeaderComponent';
import LemburItemComponent from '../components/LemburItemComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LemburScreen({navigation}) {
  const [lemburs, setLemburs] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

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

  useEffect(() => {
    getLemburs();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getLemburs();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: colors.white}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <HeaderComponent
        props={{title: 'Lemburan bulan ini', subTitle: 'Lemburan'}}
      />
      <View style={style.container}>
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
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
