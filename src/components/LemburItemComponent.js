import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../colors';

export default function LemburItemComponent(props) {
  //   console.log(props);
  const navigation = useNavigation();
  const item = props.props;
  return (
    <TouchableOpacity
      style={style.statusItem}
      onPress={() => {
        navigation.navigate('DetailLembur', item);
      }}>
      <Image
        source={{
          uri: item.gambar,
        }}
        style={[
          style.lemburImage,
          {borderColor: item.approved ? colors.success : colors.blueLight},
        ]}
      />
      <View style={{flex: 1}}>
        <Text style={style.statusItemTitle}>{item.keterangan}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text style={style.statusItemDate}>{item.tanggal}</Text>
          {item.approved ? <Text style={{fontSize: 10}}>Approved</Text> : ''}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  statusItem: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    backgroundColor: colors.blueLight,
  },
  statusItemTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  statusItemDate: {
    fontFamily: 'Poppins-Regular',
  },
  lemburImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 15,
    elevation: 20,
    borderWidth: 2,
  },
});
