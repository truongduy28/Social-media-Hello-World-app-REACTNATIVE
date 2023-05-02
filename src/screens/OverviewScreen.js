/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

import LottieView from 'lottie-react-native';

const OverviewScreen = () => {
  return (
    <View style={{backgroundColor: Colors.lightPrimary, flex: 1}}>
      <LottieView
        source={require('../assets/json/75082-dashboard.json')}
        autoPlay></LottieView>
    </View>
  );
};

export default OverviewScreen;
