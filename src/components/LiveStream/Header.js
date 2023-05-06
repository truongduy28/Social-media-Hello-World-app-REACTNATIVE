/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import {TextInput} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.text,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
      }}>
      <View style={{height: 60}}>
        <Image
          source={require('../../assets/images/live-streaming-symbol-set-online-broadcast-icon-the-concept-of-live-streaming-for-selling-on-social-media-png.png')}
          style={{width: 150, height: '100%'}}
        />
      </View>
      <View
        style={{
          backgroundColor: '#1e1e1e',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 20,
          height: 40,
          paddingHorizontal: 10,
          gap: 10,
        }}>
        <IconIonicons name="search" color={'#eee'} size={28} />
        <TextInput
          placeholder="Room ID..."
          placeholderTextColor="#eee"
          style={{
            color: Colors.lightPrimary,
            fontSize: 16,
            flex: 1,
          }}
        />
      </View>
    </View>
  );
};

export default Header;
