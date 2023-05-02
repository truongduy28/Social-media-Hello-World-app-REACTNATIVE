/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useAuthentication} from '../context/authContext';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import InfoCard from '../components/Setting/InfoCard';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';

const SettingScreen = ({navigation, route}) => {
  const {logoutFn, auth} = useAuthentication();

  const QUICK_SHORT = [
    {
      name: 'Saved',
      icon: 'md-bookmark',
      route: 'Stored-post',
      color: '#a238c6',
      role: 'all',
    },

    {
      name: 'Album',
      icon: 'md-images',
      route: 'Album',
      color: '#f874c7',
      passData: auth.userId,
      role: 'all',
    },
    {
      name: 'Weather',
      icon: 'cloudy-night-sharp',
      route: 'Weather',
      color: '#fe7733',
      role: 'all',
    },
    {
      name: 'Dashboard',
      icon: 'grid',
      route: 'Dashboard',
      color: Colors.redHeart,
      role: 'Admin',
    },
  ];

  const QUICK_TAG = [
    {
      name: 'Report a Problem',
      icon: 'ios-warning-outline',
      route: 'Report',
      passData: {type_report: 'app', data_report: null},
    },
    {name: 'Terms and Policies', icon: 'md-fitness-outline', route: 'Policy'},
  ];
  const {user} = route.params;

  const logout = async () => {
    await logoutFn();
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={{backgroundColor: '#ffffff7a'}}>
      <View
        style={{
          // backgroundColor: Colors.lightPrimary,
          paddingTop: 5,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            color: Colors.text,
            fontSize: FontSize.xLarge,
            // fontWeight: 'bold',
            fontFamily: 'Poppins-Regular',
          }}>
          Menu
        </Text>
      </View>
      <InfoCard user={user} />
      <Text
        style={{
          color: Colors.lightText,
          fontSize: 16,
          marginLeft: 10,
          marginBottom: 5,
          marginTop: 15,
          fontFamily: 'Poppins-Regular',
        }}>
        Quick short
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          marginHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        {QUICK_SHORT.map(short => (
          <TouchableOpacity
            key={short.name}
            style={{
              backgroundColor: Colors.lightPrimary,
              width: Dimensions.get('window').width / 2 - 15,
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              gap: 5,
              shadowColor: '#414142',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,
              elevation: 10,
            }}
            onPress={() =>
              navigation.navigate(
                short.route,
                short.passData && {userId: short.passData},
              )
            }>
            <IconIonicons name={short.icon} size={25} color={short.color} />
            <Text style={{color: Colors.text}}>{short.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text
        style={{
          color: Colors.lightText,
          fontSize: 16,
          marginTop: 20,
          fontFamily: 'Poppins-Regular',
          marginLeft: 10,
          // marginBottom: 5,
        }}>
        Help & Support
      </Text>
      <View
        style={{
          gap: 10,
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        {QUICK_TAG.map(tag => (
          <TouchableOpacity
            key={tag.name}
            style={{
              backgroundColor: Colors.lightPrimary,
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              gap: 10,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#414142',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,
              elevation: 5,
            }}
            onPress={() =>
              navigation.navigate(tag.route, tag.passData && tag.passData)
            }>
            <IconIonicons name={tag.icon} size={25} color={Colors.text} />
            <Text style={{fontSize: 16, color: Colors.text}}>{tag.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={style.shadow} onPress={() => logout()}>
        <View
          style={{
            backgroundColor: '#e4e5ea',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <Text style={{fontWeight: 500, fontSize: 18, color: Colors.text}}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingScreen;
const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
    marginTop: 10,
    marginBottom: 30,
  },
});
