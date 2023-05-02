/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const AvatarComponent = ({uri, size = 'tiny', color = 'blue'}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 100,
        overflow: 'hidden',
        // backgroundColor:
        //   color == 'blue' ? Colors.blueLogo : Colors.lightPrimary,
        // padding: size == 'tiny' ? 2 : 4,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Image
        style={{width: '100%', height: '100%', borderRadius: 100}}
        source={{uri}}
      />
    </View>
  );
};

export default AvatarComponent;

const styles = StyleSheet.create({});
