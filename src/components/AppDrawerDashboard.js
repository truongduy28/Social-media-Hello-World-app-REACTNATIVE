/* eslint-disable react/react-in-jsx-scope */
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';
import OverviewScreen from '../screens/OverviewScreen';
import FeedDashboardScreen from '../screens/FeedDashboardScreen';
import PostsManagerScreen from '../screens/PostsManagerScreen';

function HomeScreen() {
  // Your home screen component
}

function ProfileScreen() {
  // Your profile screen component
}

const Drawer = createDrawerNavigator();

const AppDrawerDashboard = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Overview" component={OverviewScreen} />
      <Drawer.Screen name="Posts" component={PostsManagerScreen} />
      <Drawer.Screen name="User" component={ProfileScreen} />
      <Drawer.Screen name="Report" component={ProfileScreen} />
      <Drawer.Screen name="Back to App" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
export default AppDrawerDashboard;
