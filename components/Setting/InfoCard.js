/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';
import AvatarComponent from '../Material/AvatarComponent';

const InfoCard = ({user}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 7,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 7,
      }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Profile-navigation')}>
        <View style={styles.avatarContainer}>
          <AvatarComponent uri={user.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../../assets/json/37950-happy-earth.json')}
            style={styles.lottie}
            autoPlay
            loop
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPrimary,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    position: 'relative',
  },
  avatarContainer: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    color: Colors.darkText,
  },
  emailText: {
    fontStyle: 'italic',
  },
  lottieContainer: {
    position: 'absolute',
    right: -20,
    bottom: 0,
    width: 100,
    height: 100,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default InfoCard;
