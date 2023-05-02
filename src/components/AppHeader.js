/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

const AppHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.lightPrimary,
        alignItems: 'center',
        height: 60,
        padding: 10,
      }}>
      <View style={{flex: 1.5, paddingVertical: 5}}>
        <Image
          style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
          source={require('../assets/images/Logo_Text.png')}
        />
      </View>
      <View style={{flex: 1}} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: 10,
        }}>
        <View
          style={{
            backgroundColor: Colors.gray,
            borderRadius: 50,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}>
          <IconEntypo name="plus" size={26} color={Colors.text} />
        </View>
        <View
          style={{
            backgroundColor: Colors.gray,
            borderRadius: 50,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}>
          <IconMaterialIcons name="search" size={26} color={Colors.text} />
        </View>
        <View
          style={{
            backgroundColor: Colors.gray,
            borderRadius: 50,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            flexDirection: 'row',
          }}>
          <IconMaterialCommunityIcons
            name="facebook-messenger"
            size={26}
            color={Colors.text}
          />
        </View>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
