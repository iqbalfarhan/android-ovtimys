import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  View,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import colors from '../colors';
import {TransparentStatusBar} from '../components/StatusBar';

const {width, height} = Dimensions.get('screen');

export default function DetailLemburScreen({route, navigation}) {
  const data = route.params;
  function handleBack() {
    navigation.goBack();
  }

  async function hapusLembur(id) {
    let userToken = await AsyncStorage.getItem('userToken');
    await axios
      .delete('https://is.tr6.my.id/ovtimys/api/lembur/' + id, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      })
      .then(response => {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(err => {
        console.warn(err);
      });
  }

  return (
    <>
      <TransparentStatusBar />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground source={{uri: data.gambar}} style={style.gambarLembur}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.3)'}}>
            <TouchableOpacity
              style={style.backButton}
              onPress={() => {
                handleBack();
              }}>
              <Icon name="chevron-left" size={32} color={colors.white} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={style.content}>
          <View>
            <View
              style={[
                style.statusLabel,
                {
                  backgroundColor: data.approved
                    ? colors.success
                    : colors.warning,
                },
              ]}>
              <Text style={style.statusText}>
                Overtime status {data.approved ? 'approved' : 'waiting'}
              </Text>
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <Text style={style.judul}>{data.keterangan}</Text>
            <Text style={style.tanggal}>{data.tanggal}</Text>
          </View>

          <View style={{marginBottom: 30}}>
            <View style={style.detailWrapper}>
              <View style={style.detail}>
                <Text style={style.judulDetail}>Honor</Text>
                <Text style={style.textDetail}>Rp. {data.honor}</Text>
              </View>
              <View style={style.detail}>
                <Text style={style.judulDetail}>Jenis</Text>
                <Text style={style.textDetail}>
                  Lembur {data.isLibur ? 'hari libur' : 'hari kerja'}
                </Text>
              </View>
            </View>

            <View style={style.detailWrapper}>
              <View style={style.detail}>
                <Text style={style.judulDetail}>Waktu</Text>
                <Text style={style.textDetail}>{data.waktu}</Text>
              </View>
              <View style={style.detail}>
                <Text style={style.judulDetail}>Status</Text>
                <Text style={style.textDetail}>
                  {data.status ? 'Approved' : 'Waiting'}
                </Text>
              </View>
            </View>
          </View>

          {data.approved ? (
            ''
          ) : (
            <View>
              <TouchableOpacity
                style={style.hapusButton}
                onPress={() => hapusLembur(data.id)}>
                <Text style={style.hapusButtonText}>Hapus pengajuan</Text>
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 10,
                  fontStyle: 'italic',
                  fontFamily: 'Poppins-Italic',
                  fontSize: 12,
                  color: colors.dark,
                }}>
                * Hapus pengajuan tersedia saat lemburan belum diapprove
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  gambarLembur: {width: width, height: width},
  content: {
    flex: 1,
    marginTop: -30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    backgroundColor: colors.white,
  },
  backButton: {
    marginTop: 60,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,.4)',
  },
  judul: {
    fontFamily: 'Poppins-Bold',
    textTransform: 'capitalize',
    fontSize: 20,
    color: colors.dark,
  },

  statusLabel: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 6,
    borderLeftColor: colors.blue,
    marginBottom: 30,
  },
  statusText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: colors.white,
  },

  detailWrapper: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  detail: {
    flex: 1,
  },
  judulDetail: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.dark,
  },
  textDetail: {
    fontFamily: 'Poppins-Regular',
    color: colors.dark,
  },

  hapusButton: {
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },

  hapusButtonText: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
