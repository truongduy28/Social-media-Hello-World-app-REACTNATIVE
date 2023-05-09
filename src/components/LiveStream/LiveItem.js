/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import AvatarComponent from '../Material/AvatarComponent';
import {TouchableOpacity} from 'react-native';
import {formatFromNow} from './../../utils/common';
import {useAuthentication} from '../../context/authContext';
import {useNavigation} from '@react-navigation/native';

const LiveItem = ({live}) => {
  const {auth} = useAuthentication();
  const navigation = useNavigation();

  const watchLive = liveID => {
    navigation.navigate('Watch-live', {
      userID: auth.userId,
      userName: auth.info.name,
      liveID: liveID,
    });
  };

  return (
    <TouchableOpacity onPress={() => watchLive(live.roomId.toString())}>
      <View
        style={{
          backgroundColor: Colors.text,
          padding: 10,
          width: Dimensions.get('window').width / 2 - 15,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: '100%',
            height: 200,
            position: 'relative',
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 15,
          }}>
          <Image
            source={{uri: live.streamedBy.image}}
            style={{width: '100%', height: '100%'}}
          />
          <View
            style={{
              position: 'absolute',
              top: 5,
              right: 0,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: Colors.gray,
                backgroundColor: Colors.redHeart,
                paddingHorizontal: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                textAlign: 'right',
              }}>
              RoomID: {live.roomId}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View style={{width: 50, height: 50}}>
            <AvatarComponent uri={live.streamedBy.image} />
          </View>
          <View>
            <Text style={{fontSize: 17, color: Colors.gray}}>
              {live.streamedBy.name}
            </Text>
            <Text style={{fontSize: 15, color: Colors.darkText}}>
              {formatFromNow(live.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LiveItem;
