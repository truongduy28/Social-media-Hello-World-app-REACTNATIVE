import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';

const CreateFeedLoader = () => {
  return (
    <View style={{overflow: 'hidden'}}>
      <LottieView
        source={require('../../assets/json/120348-waiting-sand.json')}
        loop
        autoPlay
        style={{
          width: '60%',
          //   backgroundColor: Colors.lightPrimary,
          //   transform: [{scale: 1.05}],
        }}
      />
    </View>
  );
};

export default CreateFeedLoader;
