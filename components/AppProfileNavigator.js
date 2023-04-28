import {View, Text, Button} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from './../screens/ProfileScreen';
import EditProfileScreen from './../screens/EditProfileScreen';
import {useAuthentication} from '../context/authContext';

const Drawer = createDrawerNavigator();
const AppProfileNavigator = () => {
  const {auth} = useAuthentication();
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{userId: auth.userId}}
        options={{swipeEnabled: false, headerShown: false, unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="Edit-profile"
        component={EditProfileScreen}
        options={{
          swipeEnabled: false,
          headerShown: false,
        }}
        initialParams={{auth: auth}}
      />
    </Drawer.Navigator>
  );
};

export default AppProfileNavigator;
