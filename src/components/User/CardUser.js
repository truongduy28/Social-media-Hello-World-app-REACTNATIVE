/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import AvatarComponent from '../Material/AvatarComponent';
import Colors from '../../constants/Colors';
import FontSize from '../../constants/FontSize';
import {SERVER_URL} from '@env';
import axios from 'axios';
import {showToast} from '../../utils/toastShow';
import {useNavigation} from '@react-navigation/native';
import {useAuthentication} from '../../context/authContext';

const CardUser = ({user, state}) => {
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const {isLoading, setIsLoading, suggestUser, setSuggestUser, auth} = state;
  const navigation = useNavigation();
  const {setAuth} = useAuthentication();

  const handleFollower = async user => {
    try {
      setIsLoadingFollow(true);

      const {data} = await axios.put(`${SERVER_URL}/users/follow`, {
        followed: user?._id,
        follower: auth.userId,
      });

      showToast(
        'success',
        'Success',
        `Follow ${data?.userFollowed?.name} success`,
      );
      const reSetSuggestUser = suggestUser.filter(
        user => user._id !== data.userFollowed?._id,
      );

      setAuth({
        ...auth,
        info: {...auth.info, following: data.userFollower.following},
      });
      setSuggestUser(reSetSuggestUser);
      setIsLoadingFollow(false);
    } catch (error) {
      console.log(error);
      setIsLoadingFollow(false);
    }
  };

  const handleRemove = user => {
    setSuggestUser(suggestUser.filter(u => u._id !== user._id));
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        gap: 10,
      }}>
      <TouchableOpacity
        style={{width: 100, height: 100}}
        onPress={() =>
          navigation.navigate('Profile', {
            userId: user._id,
            auth,
          })
        }>
        <AvatarComponent uri={user.image} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text style={{color: Colors.semiDark, fontWeight: '500', fontSize: 17}}>
          {user.name}
        </Text>
        <Text style={{fontSize: 15}}>{user.email}</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
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
            }}
            onPress={() => handleFollower(user)}>
            {isLoadingFollow ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{color: Colors.lightPrimary, fontSize: FontSize.medium}}>
                Follow
              </Text>
            )}
            {/* <ActivityIndicator size="small" color="#fff" /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e4e5ea',
              gap: 10,
              paddingHorizontal: 35,
              paddingVertical: 7,
              borderRadius: 5,
              flex: 1,
            }}
            onPress={() => handleRemove(user)}>
            <Text style={{color: Colors.text, fontSize: FontSize.medium}}>
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardUser;
