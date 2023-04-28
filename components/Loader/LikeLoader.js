import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LikeLoader = () => {
  return (
    <View>
      <LottieView
        source={require('../../assets/json/9965-loading-spinner.json')}
        autoPlay
        loop
        style={{height: 26}}
      />
    </View>
  );
};

export default LikeLoader;
