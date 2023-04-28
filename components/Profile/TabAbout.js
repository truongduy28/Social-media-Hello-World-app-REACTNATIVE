/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const TabAbout = ({profile}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.lightPrimary,
        minHeight: 300,
        position: 'relative',
      }}>
      <View style={{zIndex: 10}}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            fontStyle: 'italic',
            color: Colors.semiDark,
            marginBottom: 10,
          }}>
          "{' '}
          {profile.about
            ? profile.about
            : "This user is very nice but don't leave any trace!"}{' '}
          "
        </Text>
        <View style={styles.viewFlex}>
          <IconFeather name="map-pin" size={22} color={Colors.semiDark} />
          <Text style={styles.textLight}>From</Text>
          <Text style={[styles.textLight, styles.textBold]}>
            {profile.city ? profile.city : 'anywhere'}
          </Text>
        </View>
        <View style={styles.viewFlex}>
          <IconMaterialIcons
            name="alternate-email"
            size={22}
            color={Colors.semiDark}
          />
          <Text style={styles.textLight}>Email:</Text>
          <Text style={[styles.textLight, styles.textBold]}>
            {profile.email}
          </Text>
        </View>
        <View style={styles.viewFlex}>
          <IconIonicons
            name="ios-shield-checkmark-outline"
            size={22}
            color={Colors.semiDark}
          />
          <Text style={styles.textLight}>Access rights</Text>
          <Text style={[styles.textLight, styles.textBold]}>
            {profile.role}
          </Text>
        </View>
        <View style={styles.viewFlex}>
          <IconFeather name="clock" size={22} color={Colors.semiDark} />
          <Text style={styles.textLight}>Joined </Text>
          <Text style={[styles.textLight, styles.textBold]}>
            {moment(profile.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TabAbout;

const styles = StyleSheet.create({
  viewFlex: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  textLight: {
    color: Colors.semiDark,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  textBold: {
    color: Colors.lightText,
  },
});
