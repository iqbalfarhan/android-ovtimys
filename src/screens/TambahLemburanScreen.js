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

const TambahLemburanScreen = ({navigation}) => {
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
          title: 'Tambah lemburan',
          subTitle: 'Lemburan',
        }}
      />
      <View style={style.container}>
        <View style={style.cameraWrapper}>
          <TouchableOpacity
            onPress={() => {
              openCamera();
            }}>
            {gambar != null ? (
              <Image
                source={{uri: gambar.uri}}
                style={[
                  style.cameraInner,
                  {borderWidth: 0, resizeMode: 'cover'},
                ]}
              />
            ) : (
              <View style={style.cameraInner}>
                <Icon name="camera" size={50} color={colors.lighter} />
              </View>
            )}
          </TouchableOpacity>

          {gambar != null ? (
            <TouchableOpacity
              onPress={() => {
                setGambar(null);
              }}
              style={{
                backgroundColor: colors.danger,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                margin: 10,
                marginTop: -60,
              }}>
              <Icon name="trash" size={16} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                openGallery();
              }}
              style={{
                backgroundColor: colors.success,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                margin: 10,
                marginTop: -60,
              }}>
              <Icon name="folder" size={16} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
        <View style={style.content}>
          <View style={{marginBottom: 30}}>
            <View style={style.formGroup}>
              <Text style={style.formLabel}>Tanggal lembur</Text>
              <TouchableOpacity
                style={[style.submitButton, {backgroundColor: colors.lighter}]}
                onPress={() => {
                  setOpenDatePicker(true);
                }}>
                <Text style={[style.submitButtonText, {color: colors.dark}]}>
                  {tanggal
                    ? tanggal.toISOString().slice(0, 10)
                    : 'Pilih tanggal'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={openDatePicker}
                date={tanggal}
                mode="date"
                onConfirm={tanggal => {
                  setOpenDatePicker(false);
                  setTanggal(tanggal);
                }}
                onCancel={() => {
                  setOpenDatePicker(false);
                }}
              />
            </View>
            <View style={style.formGroup}>
              <Text style={style.formLabel}>Waktu lembur</Text>
              <View style={style.switchWrapper}>
                <TouchableOpacity
                  style={[
                    style.switchButton,
                    waktu == 'pagi' ? style.activeWaktu : {},
                  ]}
                  onPress={() => {
                    setWaktu('pagi');
                  }}>
                  <Text
                    style={[
                      style.switchButtonText,
                      waktu == 'pagi' ? style.activeWaktuText : {},
                    ]}>
                    Pagi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    style.switchButton,
                    waktu == 'sore' ? style.activeWaktu : {},
                  ]}
                  onPress={() => {
                    setWaktu('sore');
                  }}>
                  <Text
                    style={[
                      style.switchButtonText,
                      waktu == 'sore' ? style.activeWaktuText : {},
                    ]}>
                    Sore
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.formGroup}>
              <Text style={style.formLabel}>Keterangan Lemburan</Text>
              <TextInput
                style={style.formControl}
                value={keterangan}
                onChangeText={text => setKeterangan(text)}
                placeholder="Keterangan"
              />
            </View>
          </View>
          <TouchableOpacity
            style={style.submitButton}
            onPress={() => {
              handlePostLembur();
            }}>
            <View style={style.submitButtonText}>
              {uploading ? (
                <Text style={style.submitButtonText}>Loading...</Text>
              ) : (
                <Text style={style.submitButtonText}>Simpan</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default TambahLemburanScreen;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  content: {},

  cameraWrapper: {
    marginBottom: 20,
  },
  cameraInner: {
    backgroundColor: colors.secondary,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 4,
    borderRadius: 20,
    borderColor: colors.lighter,
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

  formGroup: {
    marginVertical: 10,
  },
  formLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 10,
  },
  formControl: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.lighter,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
  },

  switchWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.lighter,
    borderRadius: 15,
    overflow: 'hidden',
  },
  switchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
  switchButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.dark,
    fontSize: 16,
  },

  activeWaktu: {
    backgroundColor: colors.success,
  },
  activeWaktuText: {
    color: colors.white,
  },

  dropdownPlaceholder: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  dropdownSelectedText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  linkSppd: {
    backgroundColor: colors.blue,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.white,
  },
});
