import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Nodata = ({width}) => {
  return (
    <LottieView
      source={require('../../assets/json/28-nodata.json')}
      loop
      autoPlay
      style={{
        width,
      }}
    />
  );
};

export default Nodata;
