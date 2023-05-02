/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import AnimatedLottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
const AuthLoader = () => {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0,0.5)',
          zIndex: 1,
        },
      ]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../../assets/json/91606-loading-animation-gradient-line-2-colors-1.json')}
          autoPlay
          loop
          style={{height: 250}}
        />
      </View>
    </View>
  );
};

export default AuthLoader;

const styles = StyleSheet.create({});
