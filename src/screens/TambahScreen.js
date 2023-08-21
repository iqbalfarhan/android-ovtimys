import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import HeaderComponent from '../components/HeaderComponent';

import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TambahScreen = ({navigation}) => {
  const [gambar, setGambar] = useState(null);
  const [tanggal, setTanggal] = useState(new Date());
  const [keterangan, setKeterangan] = useState('');
  const [waktu, setWaktu] = useState('pagi');

  const [uploading, setUploading] = useState(false);

  const [openDatePicker, setOpenDatePicker] = useState(false);

  async function handlePostLembur() {
    setUploading(true);

    if (!gambar || !keterangan || !waktu || !tanggal) {
      ToastAndroid.show('inputan tidak lengkap', ToastAndroid.SHORT);
    } else {
      const formData = new FormData();
      formData.append('tanggal', tanggal.toISOString().slice(0, 10));
      formData.append('photo', {
        uri: gambar.uri,
        name: gambar.fileName,
        type: gambar.type,
      });
      formData.append('keterangan', keterangan);
      formData.append('waktu', waktu);

      let userToken = await AsyncStorage.getItem('userToken');
      await axios
        .post('https://is.tr6.my.id/ovtimys/api/lembur', formData, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response.data);

          if (response.data.success == true) {
            ToastAndroid.show('Lembur ditambahkan', ToastAndroid.SHORT);
            setGambar(null);
            setKeterangan(null);
            setWaktu('sore');
          } else {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          }
        })
        .catch(err => {
          console.warn(err.response.data);
        });
    }

    setUploading(false);
  }

  const openCamera = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(option, res => {
      if (res.didCancel) {
        console.log('didCancel');
      } else if (res.errorCode) {
        console.log(res.errorCode, res.errorMessage);
      } else {
        const data = res.assets[0];
        setGambar(data);
      }
    });
  };

  const openGallery = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(option, res => {
      if (res.didCancel) {
        console.log('didCancel');
      } else if (res.errorCode) {
        console.log(res.errorCode, res.errorMessage);
      } else {
        const data = res.assets[0];
        setGambar(data);
      }
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: colors.white}}>
      <HeaderComponent
        props={{
          title: 'Tambah Pengajuan',
          subTitle: 'Pengajuan',
        }}
      />
      <View style={style.container}>
        <View style={style.card}>
          <Text style={style.title}>Tambah laporan lembur</Text>
          <Text style={style.descText}>
            Tambah laporan overtime diovtimys dengan inputkan eviden lembur,
            tanggal lembur, waktu lembur pagi atau sore, dan input keterangan
            lembur.
          </Text>
          <TouchableOpacity
            style={style.submitButton}
            onPress={() => {
              navigation.navigate('TambahLemburan');
            }}>
            <View style={style.submitButtonText}>
              <Text style={style.submitButtonText}>
                Tambah pengajuan lemburan
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={style.card}>
          <Text style={style.title}>Tambah kegiatan SPPD</Text>
          <Text style={style.descText}>
            Tambah kegiatan sppd diovtimys dengan inputkan tanggal sppd dan
            keterangan tentang sppd misalkan tujuan.
          </Text>
          <TouchableOpacity
            style={style.submitButton}
            onPress={() => {
              navigation.navigate('TambahSppd');
            }}>
            <Text style={style.submitButtonText}>Tambah pengajuan SPPD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default TambahScreen;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  submitButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  submitButtonText: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },

  title: {
    color: colors.dark,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 10,
  },

  descText: {
    color: colors.dark,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 10,
  },

  card: {
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: colors.white,
    elevation: 10,
  },
});
