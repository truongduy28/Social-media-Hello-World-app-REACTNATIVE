/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import AvatarComponent from './../Material/AvatarComponent';
import Colors from '../../constants/Colors';
import FontSize from '../../constants/FontSize';
import {useNavigation} from '@react-navigation/native';
import {SERVER_URL} from '@env';
import axios from 'axios';
import {showToast} from './../../utils/toastShow';
import {useAuthentication} from '../../context/authContext';

const ProfileCard = ({user, auth, rootState, filter, tab}) => {
  const {userFilter, setUserFilter} = filter;
  const {profile, setProfile} = rootState;
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [isLoadingUnFollow, setIsLoadingUnFollow] = useState(false);
  const navigation = useNavigation();
  const {setAuth} = useAuthentication();

  const handleViewProfile = userId => {
    navigation.navigate('Profile', {
      userId,
      auth,
    });
  };

  const handleUnFollow = async user => {
    try {
      setIsLoadingUnFollow(true);
      const {data} = await axios.put(`${SERVER_URL}/users/un-follow`, {
        followed: user?._id,
        follower: auth.userId,
      });

      if (tab === 'Followings') {
        setUserFilter(
          userFilter.filter(user => user._id != data.userFollowed?._id),
        );
      }

      if (auth.userId == profile._id)
        setProfile({
          ...profile,
          following: profile.following.filter(
            user => user != data.userFollowed?._id,
          ),
        });

      setAuth({
        ...auth,
        info: {
          ...auth.info,
          following: auth.info.following.filter(
            user => user != data.userFollowed?._id,
          ),
        },
      });

      showToast(
        'success',
        'Successfull',
        `U have unfollowed ${data?.userFollowed?.name}!`,
      );
      setIsLoadingUnFollow(false);
      return;
    } catch (error) {
      console.log(error);
      setIsLoadingUnFollow(false);
    }
  };

  const handleFollow = async user => {
    try {
      setIsLoadingFollow(true);
      const {data} = await axios.put(`${SERVER_URL}/users/follow`, {
        followed: user?._id,
        follower: auth.userId,
      });

      if (auth.userId == profile._id)
        setProfile({
          ...profile,
          following: [...profile.following, data.userFollowed?._id],
        });

      setAuth({
        ...auth,
        info: {
          ...auth.info,
          following: [...auth.info.following, data.userFollowed?._id],
        },
      });
      showToast(
        'success',
        'Successfull',
        `U have unfollowed ${data?.userFollowed?.name}!`,
      );
      setIsLoadingFollow(false);
      return;
    } catch (error) {
      console.log(error);
      setIsLoadingFollow(false);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 20,
        marginTop: 15,
      }}>
      <TouchableOpacity
        style={{width: 70, height: 70}}
        onPress={() => handleViewProfile(user._id)}>
        <AvatarComponent uri={user.image} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 17,
            color: Colors.lightText,
            // fontFamily: 'OpenSans-Regular',
          }}>
          {user.name}
        </Text>
        <Text>{user.email}</Text>
      </View>
      {auth.info._id != user._id && !auth.info.following.includes(user._id) ? (
        <View>
          <TouchableOpacity
            onPress={() => handleFollow(user)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.blueFacebook,
              gap: 10,
              paddingHorizontal: 35,
              paddingVertical: 7,
              borderRadius: 5,
              // flex: 1,
              justifyContent: 'center',
              // opacity: !isLoadingFollow ? 1 : 0.3,
            }}>
            {isLoadingFollow ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{
                  color: Colors.lightPrimary,
                  fontSize: FontSize.medium,
                }}>
                Follow
              </Text>
            )}
            {/* <ActivityIndicator size="small" color="#fff" /> */}
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => handleUnFollow(user)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.gray,
              gap: 10,
              paddingHorizontal: 35,
              paddingVertical: 7,
              borderRadius: 5,
              // flex: 1,
              justifyContent: 'center',
              // opacity: !isLoadingFollow ? 1 : 0.3,
            }}>
            {isLoadingUnFollow ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text
                style={{
                  color: Colors.semiDark,
                  fontSize: FontSize.medium,
                }}>
                Unfollow
              </Text>
            )}
            {/* <ActivityIndicator size="small" color="#fff" /> */}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileCard;
