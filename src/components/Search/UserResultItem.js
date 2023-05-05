/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuthentication} from '../../context/authContext';
import AvatarComponent from '../Material/AvatarComponent';
import Colors from '../../constants/Colors';

const UserResultItem = ({user}) => {
  const navigation = useNavigation();
  const {auth} = useAuthentication();

  // Extract styles into a separate object for easier readability and reuse

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Profile', {
          userId: user._id,
          auth,
        })
      }>
      <View style={styles.avatarContainer}>
        <AvatarComponent uri={user.image} />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.nameText}>{user.name}</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
          <View style={styles.followButtonContainer}>
            <Text style={styles.followButtonText}>View profile</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.lightPrimary,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  avatarContainer: {
    width: 80,
    height: 80,
  },
  followButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blueFacebook,
    gap: 10,
    paddingHorizontal: 35,
    paddingVertical: 7,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    // opacity: !isLoadingFollow ? 1 : 0.3,
  },
  followButtonText: {
    color: Colors.lightBlue,
  },
  nameText: {
    color: Colors.semiDark,
    fontWeight: '500',
    fontSize: 17,
  },
  emailText: {
    fontSize: 15,
  },
  followText: {
    color: Colors.lightBlue,
  },
});

export default UserResultItem;
