/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';
import {TouchableOpacity} from 'react-native';

const MessengerScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.text,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <LottieView
          source={require('../assets/json/30786-online-chat.json')}
          style={{width: '100%'}}
          autoPlay
          loop
        />
        <Text
          style={{
            color: Colors.lightPrimary,
            fontSize: 25,
            marginHorizontal: 30,
            textAlign: 'center',
          }}>
          Messenger is currently only available on the website platform !!!
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            marginHorizontal: 30,
            marginVertical: 35,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 50,
              borderRadius: 5,
              backgroundColor: Colors.darkText,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: Colors.lightPrimary,
              }}>
              Go to Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 50,
              borderRadius: 5,
              backgroundColor: Colors.redHeart,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: Colors.lightPrimary,
              }}>
              Chat in Website
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MessengerScreen;
