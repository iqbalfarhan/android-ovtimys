import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../colors';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import HeaderComponent from '../components/HeaderComponent';

export default function TambahSppdScreen({navigation}) {
  const [keterangan, setKeterangan] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tanggal, setTanggal] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: colors.white}}>
      <HeaderComponent
        props={{
          title: 'Tambah SPPD',
          subTitle: 'SPPD',
        }}
      />
      <View style={style.container}>
        <View style={{marginBottom: 30}}>
          <View style={style.formGroup}>
            <Text style={style.formLabel}>Tanggal perjalanan</Text>
            <TouchableOpacity
              style={[style.submitButton, {backgroundColor: colors.lighter}]}
              onPress={() => {
                setOpenDatePicker(true);
              }}>
              <Text style={[style.submitButtonText, {color: colors.dark}]}>
                {tanggal ? tanggal.toISOString().slice(0, 10) : 'Pilih tanggal'}
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
            <Text style={style.formLabel}>Keterangan perjalanan SPPD</Text>
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
            // handlePostLembur();
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
    </ScrollView>
  );
}

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
    minHeight: 50,
  },
});
