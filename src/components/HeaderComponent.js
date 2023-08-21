import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import colors from '../colors';
import {useNavigation} from '@react-navigation/native';

export default function HeaderComponent({props}) {
  const navigation = useNavigation();
  return (
    <View style={style.menuBar}>
      <View style={style.header}>
        <Text style={style.headerSubTitle}>{props.subTitle}</Text>
        <Text style={style.headerTitle}>{props.title}</Text>
      </View>
      {props.gambar ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image source={{uri: props.gambar}} style={style.profile} />
        </TouchableOpacity>
      ) : (
        ''
      )}
    </View>
  );
}

const style = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    marginTop: 30,
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  header: {},
  headerTitle: {
    fontSize: 28,
    color: colors.dark,
    fontFamily: 'Poppins-Bold',
  },
  headerSubTitle: {
    fontFamily: 'Poppins-Regular',
  },
});
