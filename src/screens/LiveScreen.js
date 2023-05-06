import {View, Text} from 'react-native';
import React from 'react';
import Header from '../components/LiveStream/Header';
import TopTabNavigator from '../components/LiveStream/navigation/TopTabNavigator';

const LiveScreen = () => {
  return (
    <View style={{backgroundColor: '#1e1e1e', flex: 1}}>
      <Header />
      <TopTabNavigator />
    </View>
  );
};

export default LiveScreen;
