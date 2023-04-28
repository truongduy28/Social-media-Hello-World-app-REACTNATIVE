/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const ActivityIndicatorLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000040',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 5,
      }}>
      <ActivityIndicator size={'large'} color={Colors.lightPrimary} />
    </View>
  );
};

export default ActivityIndicatorLoader;
