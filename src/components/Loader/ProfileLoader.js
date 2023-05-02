/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';
import FeedLoader from './FeedLoader';

const ProfileLoader = () => {
  return (
    <View style={{overflow: 'hidden'}}>
      <LottieView
        source={require('../../assets/json/20957-skeleton-loading-card-landscape.json')}
        loop
        autoPlay
        style={{
          width: '100%',
          backgroundColor: Colors.lightPrimary,
          //   transform: [{scale: 1.08}],
          //   marginTop: -20,
        }}
      />
      <LottieView
        source={require('../../assets/json/20817-skeleton-loading-card.json')}
        loop
        autoPlay
        style={{
          width: '100%',
          backgroundColor: Colors.lightPrimary,
          //   transform: [{scale: 1.08}],
          //   marginTop: -20,
        }}
      />
      <LottieView
        source={require('../../assets/json/20817-skeleton-loading-card.json')}
        loop
        autoPlay
        style={{
          width: '100%',
          backgroundColor: Colors.lightPrimary,
          //   transform: [{scale: 1.08}],
          //   marginTop: -20,
        }}
      />
    </View>
  );
};

export default ProfileLoader;
