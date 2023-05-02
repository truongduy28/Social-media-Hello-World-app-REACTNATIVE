/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {SERVER_URL} from '@env';
import Colors from '../../constants/Colors';
import ProfileCard from './ProfileCard';
import useDebounce from '../../hooks/useDebounce';
import NotificationLoader from '../Loader/NotificationLoader';
import Nodata from '../Status/Nodata';

const TabFollower = ({auth, profile, rootState, tab}) => {
  const [name, setName] = useState('');
  const [usersFollower, setUsersFollower] = useState(null);
  const [userFilter, setUserFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedName = useDebounce(name, 250);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get(
          `${SERVER_URL}/users/user-follower/${profile._id}`,
        );
        setIsLoading(false);
        setUsersFollower(data.follower);
        setUserFilter(data.follower);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getUser();
  }, [profile._id]);

  useEffect(() => {
    if (!userFilter) return;
    if (!debouncedName) {
      setUserFilter(usersFollower);
      return;
    }
    setUserFilter(
      usersFollower.filter(user =>
        user.name.toLowerCase().includes(debouncedName.toLowerCase()),
      ),
    );
  }, [debouncedName]);

  return (
    <View
      style={{
        backgroundColor: Colors.lightPrimary,
        flex: 1,
        paddingVertical: 15,
      }}>
      {userFilter?.length !== 0 && (
        <View
          style={{
            backgroundColor: Colors.gray,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            paddingHorizontal: 15,
            borderRadius: 30,
          }}>
          <IconMaterialIcons name="search" size={26} color={Colors.text} />
          <TextInput
            placeholder="Searching people..."
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              flex: 1,
              flexDirection: 'row',
              color: Colors.lightText,
            }}
            onChangeText={text => setName(text)}
          />
        </View>
      )}

      <View style={{flex: 1}}>
        {isLoading ? (
          <NotificationLoader />
        ) : userFilter?.length !== 0 ? (
          userFilter?.map(user => (
            <ProfileCard
              key={user._id}
              user={user}
              auth={auth}
              rootState={rootState}
              filter={{userFilter, setUserFilter}}
              tab={tab}
            />
          ))
        ) : (
          <View
            style={{
              backgroundColor: Colors.lightPrimary,
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
              paddingBottom: 50,
            }}>
            <Nodata width={'70%'} />
            <Text style={{fontSize: 17}}>Nobody !!!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TabFollower;
