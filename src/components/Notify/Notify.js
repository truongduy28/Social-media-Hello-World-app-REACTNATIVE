/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AvatarComponent from '../Material/AvatarComponent';
import ActionTypeComponent from '../Material/ActionTypeComponent';
import {formatFromNow} from '../../utils/common';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const Notify = ({notify}) => {
  const {affectedBy, type, content, affectedPost, created} = notify;
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.lightPrimary,
        padding: 5,
        alignItems: 'center',
      }}>
      <View
        style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: 70, height: 70, position: 'relative'}}>
          <AvatarComponent uri={affectedBy.image} />
          <ActionTypeComponent type={type} />
        </View>
      </View>
      <View style={{justifyContent: 'center', flex: 1, paddingVertical: 10}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
          <Text style={{fontWeight: 'bold'}}>{affectedBy.name} </Text>
          <Text>{content} </Text>
          {affectedPost && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Feed', {id: affectedPost})}>
              <Text style={{fontWeight: 'bold'}}>View now</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text>{formatFromNow(created)}</Text>
      </View>
    </View>
  );
};

export default Notify;
