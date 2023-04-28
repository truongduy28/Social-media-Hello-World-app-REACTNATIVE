/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';
import ActivityIndicatorLoader from './ActivityIndicatorLoader';

const SuggestUserLoader = () => {
  return (
    <View
      style={{
        width: 80,
        height: 80,
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: Colors.grayBackground,
        // padding: 3,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <LottieView
        source={require('../../assets/json/8823-user.json')}
        loop
        autoPlay
        style={{
          width: '100%',
        }}
      /> */}
      <ActivityIndicatorLoader />
    </View>
  );
};

export default SuggestUserLoader;
