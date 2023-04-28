/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import axios from 'axios';
import {SERVER_URL} from '@env';
import {useAuthentication} from '../context/authContext';
import CardUser from './../components/User/CardUser';
import {ScrollView} from 'react-native';

const PeopleScreen = () => {
  const {auth} = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestUser, setSuggestUser] = useState(null);

  useEffect(() => {
    const getDataSuggestUser = async () => {
      setIsLoading(true);
      const {data} = await axios.get(
        `${SERVER_URL}/users/suggest-user/${auth.userId}`,
      );
      data?.people?.filter(u => {
        auth.userId.includes(u._id);
      });
      setSuggestUser(data?.people);
      setIsLoading(false);
    };
    getDataSuggestUser();
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
          Suggestions
        </Text>
      </View>
      <View style={{backgroundColor: Colors.lightPrimary, flex: 1}}>
        <ScrollView style={{paddingHorizontal: 15}}>
          <Text
            style={{
              // paddingHorizontal: 15,
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 10,
              color: Colors.text,
            }}>
            People You May Know
          </Text>
          {suggestUser &&
            suggestUser.map(user => (
              <CardUser
                user={user}
                key={user._id}
                state={{
                  isLoading,
                  setIsLoading,
                  suggestUser,
                  setSuggestUser,
                  auth,
                }}
              />
            ))}
        </ScrollView>
      </View>
    </>
  );
};

export default PeopleScreen;
