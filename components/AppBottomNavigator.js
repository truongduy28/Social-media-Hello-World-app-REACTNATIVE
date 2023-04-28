/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import NotificationScreen from './../screens/NotificationScreen';
import ProfileScreen from './../screens/ProfileScreen';
import PeopleScreen from './../screens/PeopleScreen';
import {useAuthentication} from '../context/authContext';
import AppProfileNavigator from './AppProfileNavigator';
import {Button} from 'react-native';

const AppBottomNavigator = () => {
  const Bottom = createBottomTabNavigator();
  const {auth} = useAuthentication();
  return (
    <Bottom.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: Colors.background}}
      activeColor="#f0edf6"
      inactiveColor="#3e2465">
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <IconEntypo name="home" color={color} size={26} />
          ),
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Bottom.Screen
        name="Notifys"
        component={PeopleScreen}
        options={{
          tabBarLabel: 'People',
          tabBarIcon: ({color}) => (
            <IconIonicons name="ios-people" color={color} size={26} />
          ),
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Bottom.Screen
        name="Notify"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color}) => (
            <IconMaterialCommunityIcons name="bell" color={color} size={26} />
          ),

          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Bottom.Screen
        name="Profile-navigation"
        component={AppProfileNavigator}
        options={{
          title: 'My Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <IconFontAwesome5 name="user-circle" color={color} size={26} />
          ),
          headerTitleAlign: 'center',
          unmountOnBlur: true,
        }}
        initialParams={{userId: auth.userId}}
      />
      <Bottom.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color}) => (
            <IconMaterialIcons name="settings" color={color} size={26} />
          ),
          headerShown: false,
        }}
        initialParams={{user: auth.info}}
      />
    </Bottom.Navigator>
  );
};

export default AppBottomNavigator;
