/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';

const NotificationLoader = () => {
  return (
    <View style={{overflow: 'hidden'}}>
      <LottieView
        source={require('../../assets/json/23718-card-view-loader.json')}
        loop
        autoPlay
        style={{
          width: '100%',
          backgroundColor: Colors.lightPrimary,
          transform: [{scale: 1.08}],
          marginTop: -20,
        }}
      />
    </View>
  );
};

export default NotificationLoader;
