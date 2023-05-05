/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AppHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.lightPrimary,
        alignItems: 'center',
        height: 60,
        padding: 10,
        // position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
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
        <TouchableOpacity
          style={{
            backgroundColor: Colors.gray,
            borderRadius: 50,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}
          onPress={() => navigation.navigate('Search')}>
          <IconMaterialIcons name="search" size={26} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.gray,
            borderRadius: 50,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            flexDirection: 'row',
          }}
          onPress={() => navigation.navigate('Messenger')}>
          <IconMaterialCommunityIcons
            name="facebook-messenger"
            size={26}
            color={Colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
