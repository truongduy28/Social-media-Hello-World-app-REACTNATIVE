/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import {SERVER_URL} from '@env';
import {useAuthentication} from '../context/authContext';
import Notify from '../components/Notify/Notify';
import NotificationLoader from '../components/Loader/NotificationLoader';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const {auth} = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.get(
          `${SERVER_URL}/users/notify/${auth.userId}`,
        );
        setIsLoading(false);
        setNotifications(data.user.notify);
      } catch (error) {
        console.log('Error at NotificationScreen line 32:', error);
        setIsLoading(false);
      }
    };
    getNotifications();
  }, []);

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.lightPrimary,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            color: Colors.blueLogo,
            fontSize: FontSize.xLarge,
            fontFamily: 'Poppins-Regular',
          }}>
          Notifications
        </Text>
      </View>
      <View style={{paddingBottom: 61}}>
        {isLoading ? (
          <NotificationLoader />
        ) : (
          <ScrollView>
            {notifications.length > 0 ? (
              notifications
                .sort((a, b) => b.created.localeCompare(a.created))
                .map((notify, index) => <Notify notify={notify} key={index} />)
            ) : (
              <Text>No notifications</Text>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default NotificationScreen;
