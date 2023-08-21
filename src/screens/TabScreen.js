import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../colors';

import HomeScreen from './HomeScreen';
import TambahScreen from './TambahScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Tambah') {
            iconName = 'plus-circle';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else {
            iconName = 'sticker-plus';
          }

          return focused ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.primary,
                paddingVertival: 20,
                height: 46,
                paddingHorizontal: 20,
                borderRadius: 30,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: 'Poppins-Bold',
                }}>
                {route.name}
              </Text>
            </View>
          ) : (
            <Icon name={iconName} size={26} color={color} />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 72,
          paddingHorizontal: 20,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
        tabBarIcon={{size: 90}}
      />
      <Tab.Screen
        name="Tambah"
        component={TambahScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
