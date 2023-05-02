/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import {SERVER_URL} from '@env';
import axios from 'axios';
import {useAuthentication} from '../context/authContext';
import ProfileBody from '../components/Profile/ProfileBody';
import ProfileLoader from '../components/Loader/ProfileLoader';
import {ScrollView} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = ({route}) => {
  const {auth} = useAuthentication();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState('Posts');
  const {userId} = route.params;
  const navigation = useNavigation();
  // console.log(userId);

  useEffect(() => {
    const getProfile = async () => {
      setTab('Posts');
      try {
        setIsLoading(true);
        const {data} = await axios.get(`${SERVER_URL}/users/${userId}`);
        setProfile(data.user);
        setIsLoading(false);
      } catch (error) {
        console.log('error at ProfileHeader at line 23');
        setIsLoading(false);
      }
    };
    getProfile();
  }, [userId]);

  const isMe = auth.userId === userId;

  const handleReport = () => {
    navigation.navigate('Report', {type_report: 'user', data_report: profile});
  };

  return (
    <View>
      {isLoading ? (
        <ProfileLoader />
      ) : profile ? (
        <>
          <ScrollView>
            <ProfileHeader
              tabState={{tab, setTab}}
              profile={profile}
              auth={auth}
              isMe={isMe}
              fn={{handleReport}}
            />
            <ProfileBody
              tabState={{tab}}
              profile={profile}
              auth={auth}
              rootState={{profile, setProfile}}
            />
          </ScrollView>
        </>
      ) : (
        <Text>K co user</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
