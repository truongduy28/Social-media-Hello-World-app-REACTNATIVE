import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';

const FeedLoader = () => {
  return (
    <View style={{overflow: 'hidden'}}>
      <LottieView
        source={require('../../assets/json/12534-loading-animation-of-main-feed-page.json')}
        loop
        autoPlay
        style={{
          width: '100%',
          backgroundColor: Colors.lightPrimary,
          transform: [{scale: 1.05}],
        }}
      />
    </View>
  );
};

export default FeedLoader;
